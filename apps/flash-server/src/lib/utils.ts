import type { Answer } from "@flash/db/types";

export type CalcAnswer = Pick<Answer, "left" | "right" | "operation" | "entry">;

export function calculate(answer: CalcAnswer) {
  switch (answer.operation) {
    case "addition":
      return answer.left + answer.right;
    case "subtraction":
      return answer.left - answer.right;
    case "multiplication":
      return answer.left * answer.right;
    case "division":
      return Math.floor(answer.left / answer.right);
    default:
      throw new Error(`Invalid operation ${answer.operation}`);
  }
}

export const isCorrect = (answer: CalcAnswer) => {
  return answer.entry === calculate(answer);
};
