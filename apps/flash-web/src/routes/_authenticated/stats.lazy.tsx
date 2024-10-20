import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useStats } from "@/lib/api/answers";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export const Route = createLazyFileRoute("/_authenticated/stats")({
  component: Stats,
});

const chartConfig = {
  correct: {
    label: "Correct",
    color: "#2563eb",
  },
  incorrect: {
    label: "Incorrect",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

function Stats() {
  const dataPoints = useStats();

  return (
    <>
      {dataPoints.isError && (
        <div className="w-full h-full">{dataPoints.error.message}</div>
      )}
      {dataPoints.isLoading || dataPoints.isFetching || dataPoints.isPending ? (
        <Skeleton className="w-full h-full m-auto animate-pulse grid place-items-center">
          <div>Loading...</div>
        </Skeleton>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-[200px] m-auto">
          <BarChart accessibilityLayer data={dataPoints.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="correct" fill="var(--color-correct)" radius={4} />
            <Bar dataKey="incorrect" fill="var(--color-incorrect)" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </>
  );
}
