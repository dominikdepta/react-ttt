import cs from "classnames";
import styles from "./Reset.module.css";
import { ResetProps } from "./types";

export const Reset = ({ className, children, ...restProps }: ResetProps) => (
  <button className={cs(styles.wrapper, className)} {...restProps}>
    {children}
  </button>
);
