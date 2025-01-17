import { useState } from "react";
import { Square } from "../square";
import styles from "./Board.module.css";
import { Move } from "./types";
import { Reset } from "../reset";

const movesInitialState: Move[][] = [
  [null, null, null, null, null, null, null, null, null],
];

const winnerLines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (lastMoveSquares: Move[]): number[] | undefined =>
  winnerLines.find(
    ([a, b, c]) =>
      lastMoveSquares[a] &&
      lastMoveSquares[a] === lastMoveSquares[b] &&
      lastMoveSquares[b] === lastMoveSquares[c]
  );

export const Board = () => {
  const [moves, setMoves] = useState<Move[][]>(movesInitialState);
  const lastMoveSquares: Move[] = moves[moves.length - 1];
  const nextMove: Move = moves.length % 2 ? "x" : "o";
  const winnerSquares = checkWinner(lastMoveSquares);
  const isGameEnded = !!winnerSquares || moves.length === 10;

  console.log(winnerSquares);

  const handleSquareClick = (squareIndex: number) => () => {
    if (lastMoveSquares[squareIndex] !== null || isGameEnded) {
      return;
    }

    setMoves([
      ...moves,
      lastMoveSquares.map((value, i) => (i === squareIndex ? nextMove : value)),
    ]);
  };

  const handleResetClick = () => {
    setMoves(movesInitialState);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.squares}>
        {lastMoveSquares.map((value, i) => (
          <Square
            onClick={handleSquareClick(i)}
            disabled={isGameEnded}
            isHighlighted={
              !!winnerSquares && winnerSquares.find((v) => v === i) !== undefined
            }
          >
            {value}
          </Square>
        ))}
      </div>

      <Reset className={styles.reset} onClick={handleResetClick}>
        Reset
      </Reset>
    </div>
  );
};
