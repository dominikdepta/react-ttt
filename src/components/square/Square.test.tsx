import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Square } from "./Square";

describe("<Square />", () => {
  test("rendering button with given content", () => {
    render(<Square>test content</Square>);

    expect(screen.getByRole("button")).toHaveTextContent("test content");
  });
});
