import cs from "classnames";
import styles from "./Square.module.css";
import { SquareProps } from "./types";

export const Square = ({
  children,
  className,
  isHighlighted,
  ...restProps
}: SquareProps) => (
  <button
    className={cs(
      styles.wrapper,
      isHighlighted && styles.highlighted,
      className,
    )}
    {...restProps}
  >
    {children}
  </button>
);
