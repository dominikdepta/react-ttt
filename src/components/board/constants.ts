import { Move } from "./types";

export const movesInitialState: Move[] = [
  {
    nextMove: "x",
    squares: [null, null, null, null, null, null, null, null, null],
  },
];

export const winnerLines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
