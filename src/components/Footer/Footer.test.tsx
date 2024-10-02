import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Footer } from "./Footer";

test('footer render with text "Footer"', () => {
  render(<Footer />);

  const footerElement = screen.getByText(/Footer/i);
  expect(footerElement).toBeInTheDocument();
});

test("footer has right classes", () => {
  render(<Footer />);

  const footerElement = screen.getByText(/Footer/i).parentElement;

  expect(footerElement).toHaveClass("w-full h-20 bg-[#28292c] text-white");
});
