import { useMutation, useQuery } from "@tanstack/react-query";
import { createClient } from "@flash/server";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { queryClient } from "./query-client";
import viteLogo from "/vite.svg";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { CreateAnswer } from "@flash/db/types";

const client = createClient("", { init: { credentials: "include" } });

async function getAnswers() {
  const res = await client.api.answers.$get();
  return await res.json();
}

async function saveAnswer(toCreate: CreateAnswer) {
  const res = await client.api.answers.$post({
    json: toCreate,
  });

  return await res.json();
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <SignedIn>
        <SaveRandom />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}

function SaveRandom() {
  const { isLoading, isPending, isFetching, data } = useQuery({
    queryKey: ["get-answers"],
    queryFn: getAnswers,
  });

  const save = useMutation({
    mutationKey: ["save-answer"],
    mutationFn: saveAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-answers"] });
    },
  });
  return (
    <>
      <button
        onClick={() =>
          save.mutate({
            left: random(0, 10),
            right: random(0, 10),
            operation: "addition",
            entry: 42,
          })
        }
      >
        Save random
      </button>
      {isLoading || isPending || isFetching ? (
        "Loading..."
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  );
}

export default App;
