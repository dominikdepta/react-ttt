import React from "react";

export interface SquareProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isHighlighted?: boolean;
  children: React.ReactNode;
}
