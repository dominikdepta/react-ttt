export type MoveType = "x" | "o";

export interface Move {
  nextMove: MoveType;
  squares: Array<null | MoveType>;
}
