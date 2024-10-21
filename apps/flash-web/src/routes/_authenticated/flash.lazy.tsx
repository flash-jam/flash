import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRecentAnswers, useSaveAnswer } from "@/lib/api/answers";
import { useProfile } from "@/lib/api/profiles";
import { useResetScore, useScore } from "@/lib/api/scores";
import { useFlash } from "@/lib/flash";
import { cn } from "@/lib/utils";
import { Operation, Profile, Score } from "@flash/db/types";
import { CaretSortIcon, ResetIcon } from "@radix-ui/react-icons";
import { createLazyFileRoute } from "@tanstack/react-router";
import { CheckCircle, RotateCcw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { calculate } from "../../../../flash-server/src/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute("/_authenticated/flash")({
  component: Flash,
});

type Op = "All" | "Addition" | "Subtraction" | "Multiplication" | "Division";
type OpSymbol = "+" | "-" | "x" | "÷";
type OperationSymbols = Record<
  "Addition" | "Subtraction" | "Multiplication" | "Division",
  OpSymbol
>;
const OperationSymbol: OperationSymbols = {
  Addition: "+",
  Subtraction: "-",
  Multiplication: "x",
  Division: "÷",
};

function toOpSymbol(operation: Operation): OpSymbol {
  switch (operation) {
    case "addition":
      return OperationSymbol.Addition;
    case "subtraction":
      return OperationSymbol.Subtraction;
    case "multiplication":
      return OperationSymbol.Multiplication;
    case "division":
      return OperationSymbol.Division;
  }
}

function toOperationType(op: Op): Operation | undefined {
  switch (op) {
    case "All":
      return undefined;
    case "Addition":
      return "addition";
    case "Subtraction":
      return "subtraction";
    case "Multiplication":
      return "multiplication";
    case "Division":
      // return "division";
      return "multiplication";
  }
}

function Flash() {
  const [op, setOp] = useState<Op>("All");

  return (
    <div className="flex flex-col h-full">
      <div className="m-auto flex flex-col gap-2">
        <h1 className="text-3xl">Let's Flash!!</h1>
        <h2 className="text-xl">
          Operation:
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-between w-full md:w-1/2 ps-2 pe-1 border rounded hover:bg-muted">
                {op}
                <CaretSortIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-full">
              <DropdownMenuLabel>Operation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOp("All")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOp("Addition")}>
                Addition
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOp("Subtraction")}>
                Subtraction
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOp("Multiplication")}>
                Multiplication
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOp("Division")}>
                Division
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </h2>
        <FlashCard op={op} />
      </div>
    </div>
  );
}

function FlashCard({ op }: { op: Op }) {
  const { flash, newFlash } = useFlash(toOperationType(op));
  const [status, setStatus] = useState<string>("");
  const [entry, setEntry] = useState("");
  const saveAnswer = useSaveAnswer();
  const profile = useProfile();
  const score = useScore();

  function correct() {
    setStatus(
      cn("animate-[ping_.5s_ease-out]", "border-4", "border-green-400")
    );
  }

  function incorrect() {
    setStatus(
      cn("animate-[ping_.5s_ease-in-out]", "border-4", "border-red-400")
    );
  }

  useEffect(() => {
    const timeoutId = status !== "" ? setTimeout(() => setStatus(""), 500) : 0;
    return () => clearTimeout(timeoutId);
  }, [status]);

  async function checkAnswer(answer: number) {
    if (answer === flash.answer) {
      correct();
      console.log("entry:", { answer });
      saveAnswer.mutate(
        {
          entry: answer,
          left: flash.left,
          operation: flash.operation,
          right: flash.right,
        },
        {
          onSuccess: () => {
            setEntry("");
            newFlash(toOperationType(op));
          },
        }
      );
      return;
    }

    if (flash.answer.toString().startsWith(answer.toString())) {
      return;
    }

    incorrect();
    await saveAnswer.mutateAsync(
      {
        entry: answer,
        left: flash.left,
        operation: flash.operation,
        right: flash.right,
      },
      {
        onSuccess: () => {
          setEntry("");
          // newFlash(toOperationType(op));
        },
      }
    );
  }

  return (
    <div className="grid grid-flow-row auto-rows-max md:grid-flow-col md:auto-cols-auto gap-2 place-items-center m-auto">
      <div className="col-span-2">
        {profile.isLoading ||
        profile.isPending ||
        profile.isFetching ||
        score.isLoading ||
        score.isPending ||
        score.isFetching ? (
          <span>"Loading..."</span>
        ) : (
          <ScoreDisplay profile={profile.data!} score={score.data!} />
        )}
      </div>
      <div className="relative">
        <div className={cn("absolute", "h-full", "w-full", status)}></div>
        <Card className="relative z-10 w-80 dark:bg-white dark:text-background">
          <CardHeader>
            <CardDescription>Enter the answer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end">
              <h1 className="text-[72pt]">{flash.left}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-[72pt]">{toOpSymbol(flash.operation)}</h1>
              <h1 className="text-[72pt]">{flash.right}</h1>
            </div>
            <hr className="border-t-8" />
            <Input
              className="h-36 text-[72pt] text-right border-0 focus:outline-none focus:border-0"
              value={entry}
              onChange={(e) => {
                setEntry(e.currentTarget.value);
                if (e.currentTarget.value) {
                  checkAnswer(Number(e.currentTarget.value));
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      <RecentAnswers />
    </div>
  );
}

function RecentAnswers() {
  const recentAnswers = useRecentAnswers();

  return (
    <div className="border rounded w-80">
      <div className="h-10 text-muted-foreground px-2 text-sm border-b flex justify-between items-center">
        Recent Answers
        {(recentAnswers.isPending ||
          recentAnswers.isLoading ||
          recentAnswers.isFetching) && (
          <RotateCcw className="animate-spin" size={16} />
        )}
      </div>
      <div className="h-[494px] overflow-auto relative">
        {recentAnswers.isError && (
          <div className="text-red-400">{recentAnswers.error.message}</div>
        )}
        {recentAnswers.data && (
          <Table className="relative">
            <TableBody>
              {recentAnswers.data.map((a) => (
                <TableRow key={a.id.toString()}>
                  <TableCell className="flex flex-col">
                    <div className="w-full flex justify-between align-middle animate-appear">
                      <div className="flex flex-col">
                        <span>
                          {a.left} {toOpSymbol(a.operation)} {a.right} ={" "}
                          {a.entry}
                        </span>{" "}
                        <span>{a.createdAt.toLocaleString()}</span>
                      </div>
                      {a.entry === calculate(a) ? (
                        <CheckCircle className="size-4 text-green-500 my-auto" />
                      ) : (
                        <XCircle className="size-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

function ScoreDisplay({ profile, score }: { profile: Profile; score: Score }) {
  const resetScore = useResetScore();

  return (
    <div className="flex flex-col">
      <div>
        <em>Level:</em> {profile.level}
      </div>
      <div className="flex align-middle items-center gap-2">
        <div>
          <em>Score:</em> {score.score}
        </div>
        <div>
          <Button variant="ghost" size="sm" onClick={() => resetScore.mutate()}>
            Reset score
            <ResetIcon aria-describedby="Reset" />
          </Button>
        </div>
      </div>
    </div>
  );
}
