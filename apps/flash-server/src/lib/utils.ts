import type { Answer } from "@flash/db/types";

export function calculate(answer: Answer) {
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

export const isCorrect = (answer: Answer) => {
  return answer.entry === calculate(answer);
};
