import { render, screen, waitFor } from "@testing-library/react";
import useTruncateInstructions from "../useTruncateInstructions";

const TestComponent = ({
  ingredients,
}: {
  ingredients: string | string[] | null | undefined;
}) => {
  const truncatedInstructions = useTruncateInstructions(ingredients);

  return (
    <div data-testid="truncated-instructions">{truncatedInstructions}</div>
  );
};

describe("useTruncateInstructions", () => {
  it("should truncate an array of ingredients to 150 characters", async () => {
    const ingredients = [
      "Tomatoes",
      "Cheese",
      "Basil",
      "Olive Oil",
      "Garlic",
      "Salt",
      "Pepper",
    ];

    render(<TestComponent ingredients={ingredients} />);

    const expectedResult = ingredients.join(" ").slice(0, 150);

    await waitFor(() =>
      expect(screen.getByTestId("truncated-instructions")).toHaveTextContent(
        expectedResult
      )
    );
  });

  it("should truncate a string of ingredients to 150 characters", async () => {
    const ingredients =
      "Tomatoes, Cheese, Basil, Olive Oil, Garlic, Salt, Pepper, and more ingredients for this recipe.";

    render(<TestComponent ingredients={ingredients} />);

    const expectedResult = ingredients.slice(0, 150);

    await waitFor(() =>
      expect(screen.getByTestId("truncated-instructions")).toHaveTextContent(
        expectedResult
      )
    );
  });

  it("should return an empty string for null input", async () => {
    render(<TestComponent ingredients={null} />);

    await waitFor(() =>
      expect(screen.getByTestId("truncated-instructions")).toHaveTextContent("")
    );
  });

  it("should return an empty string for undefined input", async () => {
    render(<TestComponent ingredients={undefined} />);

    await waitFor(() =>
      expect(screen.getByTestId("truncated-instructions")).toHaveTextContent("")
    );
  });

  it("should return the full string if it is shorter than 150 characters", async () => {
    const ingredients = "Short recipe description.";

    render(<TestComponent ingredients={ingredients} />);

    await waitFor(() =>
      expect(screen.getByTestId("truncated-instructions")).toHaveTextContent(
        ingredients
      )
    );
  });

  it("should return the concatenated string if the array is shorter than 150 characters", async () => {
    const ingredients = ["Short", "recipe", "description."];

    render(<TestComponent ingredients={ingredients} />);

    const expectedResult = ingredients.join(" ");

    await waitFor(() =>
      expect(screen.getByTestId("truncated-instructions")).toHaveTextContent(
        expectedResult
      )
    );
  });
});
