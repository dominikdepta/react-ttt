import { ChangeEvent, useEffect, useState } from "react";
import { History } from "../history";
import { Reset } from "../reset";
import { Square } from "../square";
import styles from "./Board.module.css";
import { Move } from "./types";
import { movesInitialState, winnerLines } from "./constants";

const checkWinner = (move: Move): number[] | undefined =>
  winnerLines.find(
    ([a, b, c]) =>
      move &&
      move.squares[a] &&
      move.squares[a] === move.squares[b] &&
      move.squares[b] === move.squares[c]
  );

export const Board = () => {
  const [moves, setMoves] = useState<Move[]>(movesInitialState);
  const [movePos, setMovePos] = useState(moves.length - 1);
  const currentMove: Move = moves[movePos];
  const winnerSquares = checkWinner(currentMove);
  const isGameEnded = !!winnerSquares || movePos == 9;

  const handleSquareClick = (squareIndex: number) => () => {
    if (
      !currentMove ||
      currentMove.squares[squareIndex] !== null ||
      isGameEnded
    ) {
      return;
    }

    setMoves([
      ...(movePos <= moves.length ? moves.slice(0, movePos + 1) : moves),
      {
        squares: currentMove.squares.map((value, i) =>
          i === squareIndex ? currentMove.nextMove : value
        ),
        nextMove: currentMove.nextMove === "x" ? "o" : "x",
      },
    ]);
  };

  const handleResetClick = () => {
    setMoves(movesInitialState);
  };

  const handleHistorySliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMovePos(Number(e.target.value));
  };

  useEffect(() => {
    setMovePos(moves.length - 1);
  }, [moves]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.squares}>
        {currentMove &&
          currentMove.squares.map((value, i) => (
            <Square
              key={`${value}-${i}`}
              onClick={handleSquareClick(i)}
              disabled={isGameEnded}
              isHighlighted={
                !!winnerSquares &&
                winnerSquares.find((v) => v === i) !== undefined
              }
            >
              {value}
            </Square>
          ))}
      </div>

      <Reset className={styles.reset} onClick={handleResetClick}>
        Reset
      </Reset>

      <History
        className={styles.history}
        min={0}
        max={moves.length - 1}
        value={movePos}
        step={1}
        onChange={handleHistorySliderChange}
      />
    </div>
  );
};
