import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header brand", () => {
  render(<App />);
  expect(screen.getByText(/Note Keeper/i)).toBeInTheDocument();
});

test("renders search input", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Search notes/i)).toBeInTheDocument();
});
