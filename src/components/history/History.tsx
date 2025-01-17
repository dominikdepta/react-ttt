import cs from "classnames";
import styles from "./History.module.css";
import { HistoryProps } from "./types";

export const History = ({ className, ...restProps }: HistoryProps) => (
  <input
    type="range"
    className={cs(styles.wrapper, className)}
    {...restProps}
  />
);
