import { client } from "@/lib/api/client";
import { queryClient } from "@/query-client";
import { useMutation, useQuery } from "@tanstack/react-query";

async function getScore() {
  const res = await client.api.scores.foruser.$get();

  if (!res.ok) return null;

  const score = await res.json();

  console.log("getScore:", { score });

  return score;
}

export const useScore = () =>
  useQuery({
    queryKey: ["get-score"],
    queryFn: getScore,
  });

async function resetScore() {
  const res = await client.api.scores.reset.$post();

  if (!res.ok) return null;

  return await res.json();
}

export const useResetScore = () =>
  useMutation({
    mutationKey: ["reset-score"],
    mutationFn: resetScore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-score"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-profile"],
      });
    },
  });
