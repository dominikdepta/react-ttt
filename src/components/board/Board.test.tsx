import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import squareStyles from '../square/Square.module.css';
import { Board } from "./Board";

const getSquare = (num: number) => screen.getByLabelText(`Square ${num}`);
const getSquares = () => screen.getAllByLabelText(/Square \d+/);
const getHistorySlider = () => screen.getByRole("slider");

describe("<Board />", () => {
  test("rendering empty squares in the beginning of the game", () => {
    render(<Board />);
    const squares = getSquares();
    expect(squares).toHaveLength(9);
    squares.forEach((square) => {
      expect(square).toHaveTextContent("");
    });
  });

  test("rendering X and O alternately after clicking on squares", async () => {
    render(<Board />);
    const user = userEvent.setup();
    const squares = getSquares();

    await user.click(squares[0]);
    expect(getSquare(1)).toHaveTextContent("x");

    await user.click(squares[1]);
    expect(getSquare(2)).toHaveTextContent("o");

    await user.click(squares[2]);
    expect(getSquare(3)).toHaveTextContent("x");
  });

  test("resetting game after clicking reset button", async () => {
    render(<Board />);
    const user = userEvent.setup();
    const squares = getSquares();
    const resetButton = screen.getByRole("button", { name: "Reset" });

    await user.click(squares[0]);
    expect(getSquare(1)).toHaveTextContent("x");

    await user.click(resetButton);
    expect(getHistorySlider()).toHaveAttribute("max", "0");
    squares.forEach((square) => {
      expect(square).toHaveTextContent("");
    });
  });

  test("highlighting winning squares", async () => {
    render(<Board />);
    const user = userEvent.setup();
    const squares = getSquares();

    await user.click(squares[0]);
    await user.click(squares[3]);
    await user.click(squares[1]);
    await user.click(squares[4]);
    await user.click(squares[2]);

    expect(getSquare(1)).toHaveClass(squareStyles.highlighted);
    expect(getSquare(2)).toHaveClass(squareStyles.highlighted);
    expect(getSquare(3)).toHaveClass(squareStyles.highlighted);
  });

  test("preventing to change already used squares", async () => {
    render(<Board />);
    const user = userEvent.setup();

    await user.click(getSquare(1));
    expect(getSquare(1)).toHaveTextContent("x");

    await user.click(getSquare(1));
    expect(getSquare(1)).toHaveTextContent("x");
  });

  test("changing history slider max value after each move", async () => {
    render(<Board />);
    const user = userEvent.setup();
    const squares = getSquares();
    const slider = getHistorySlider();

    expect(slider).toHaveAttribute("max", "0");

    await user.click(squares[0]);
    expect(slider).toHaveAttribute("max", "1");

    await user.click(squares[1]);
    expect(slider).toHaveAttribute("max", "2");
  });

  test("moving back and forward with history slider", async () => {
    render(<Board />);
    const user = userEvent.setup();
    const squares = getSquares();

    await user.click(squares[0]);
    await user.click(squares[1]);
    expect(getSquare(2)).toHaveTextContent("o");

    fireEvent.change(getHistorySlider(), { target: { value: 1 }})
    expect(getSquare(2)).toHaveTextContent("");

    fireEvent.change(getHistorySlider(), { target: { value: 2 }})
    expect(getSquare(2)).toHaveTextContent("o");
  });

  test("removing subsequent history entries when making a move after going back in history", async () => {
    render(<Board />);
    const user = userEvent.setup();
    const squares = getSquares();
    const slider = getHistorySlider();

    await user.click(squares[0]);
    await user.click(squares[1]);
    await user.click(squares[2]);

    fireEvent.change(getHistorySlider(), { target: { value: 0 }})
    await user.click(getSquare(4));

    expect(slider).toHaveAttribute("max", "1");
    expect(getSquare(1)).toHaveTextContent("");
    expect(getSquare(2)).toHaveTextContent("");
    expect(getSquare(3)).toHaveTextContent("");
    expect(getSquare(4)).toHaveTextContent("x");
  });
});
