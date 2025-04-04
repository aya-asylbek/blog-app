import { render, screen, fireEvent } from "@testing-library/react";
import SentimentIndicator from "./SentimentIndicator";

test("displays sentiment score after analysis", async () => {
  render(<SentimentIndicator content="This is a happy post!" />);
  fireEvent.click(screen.getByText("Analyze Sentiment"));
  expect(await screen.findByText(/Score:/)).toBeInTheDocument();
});