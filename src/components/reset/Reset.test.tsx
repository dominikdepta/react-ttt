import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import { Reset } from "./Reset";

describe('<Reset />', () => {
  test("rendering button with given content", () => {
    render(<Reset>test content</Reset>)

    expect(screen.getByRole('button')).toHaveTextContent('test content');
  })
})
