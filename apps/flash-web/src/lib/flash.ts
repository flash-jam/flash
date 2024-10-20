import { Operation, type CreateAnswer } from "@flash/db/types";
import { useState } from "react";

export type FlashCard = Pick<CreateAnswer, "left" | "right" | "operation"> & {
  answer: number;
};

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function randOp(): Operation {
  const x = rand(4, 1);
  switch (x) {
    case 3:
      // return "division";
      return "multiplication";
    case 2:
      return "multiplication";
    case 1:
      return "subtraction";
    default:
      return "addition";
  }
}

function nextFlash(operation: Operation, max: number, min: number): FlashCard {
  switch (operation) {
    case "addition": {
      const left = rand(max, min);
      const right = rand(max, min);
      return { left, right, operation, answer: left + right };
    }
    case "subtraction": {
      const left = rand(max, min);
      const right = rand(left, min);
      return { left, right, operation, answer: left - right };
    }
    case "multiplication": {
      const left = rand(max, min);
      const right = rand(max, min);
      return { left, right, operation, answer: left * right };
    }
    case "division": {
      const left = rand(max, min);
      const right = rand(left, min);
      return { left, right, operation, answer: Math.floor(left / right) };
    }
  }
}

export type FlashState = {
  flash: FlashCard;
  newFlash: (operation?: Operation) => void;
  setFlash: (flash: FlashCard) => void;
};

export function useFlash(operation?: Operation): FlashState {
  const [flash, setFlash] = useState<FlashCard>(
    nextFlash(operation || randOp(), 10, 1)
  );

  const newFlash = (op?: Operation) => {
    let i = 0;
    const nextOp = op || randOp();
    let f = nextFlash(nextOp, 10, 1);
    while (
      i < 3 &&
      flash.left === f.left &&
      flash.right === f.right &&
      flash.operation === f.operation
    ) {
      f = nextFlash(nextOp, 10, 1);
      i++;
    }
    setFlash(f);
  };

  return { flash, newFlash, setFlash };
}
