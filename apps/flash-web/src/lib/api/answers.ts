import { client } from "@/lib/api/client";
import { queryClient } from "@/query-client";
import { Answer, CreateAnswer, Operation } from "@flash/db/types";
import { useMutation, useQuery } from "@tanstack/react-query";

type AnswerRaw = {
  id: number;
  left: number;
  right: number;
  operation: Operation;
  entry: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

function toAnswer(raw: AnswerRaw): Answer {
  return {
    ...raw,
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
  };
}

function toAnswers(raw: AnswerRaw[]): Answer[] {
  return raw.map(toAnswer);
}

async function saveAnswer(data: CreateAnswer): Promise<Answer | null> {
  const res = await client.api.answers.$post({
    json: data,
  });

  if (!res.ok) return null;

  return toAnswer(await res.json());
}

export function useSaveAnswer() {
  return useMutation({
    mutationKey: ["save-answer"],
    mutationFn: saveAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-recent-answers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-score"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-profile"],
      });
    },
  });
}

async function recentAnswers(): Promise<Answer[]> {
  const res = await client.api.answers.recent.$get();

  if (!res.ok) return [];

  return toAnswers(await res.json());
}

export function useRecentAnswers() {
  return useQuery({
    queryKey: ["get-recent-answers"],
    queryFn: recentAnswers,
  });
}

async function getStats(range?: string) {
  const res = await client.api.answers.stats.$get({
    query: { range },
  });

  if (!res.ok) return [];

  const { dataPoints } = await res.json();
  return dataPoints;
}

export const useStats = (range?: string) =>
  useQuery({
    queryKey: ["get-stats", range],
    queryFn: () => getStats(range),
  });
