import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import useFetchSingleRecipe from "../../hooks/useFetchSingleRecipe";
import RecipeDrawer from "../RecipeDrawer";

jest.mock("../../hooks/useFetchSingleRecipe");

const mockUseFetchSingleRecipe = useFetchSingleRecipe as jest.Mock;

const mockRecipe = {
  id: 1,
  name: "Spaghetti Bolognese",
  difficulty: "Easy",
  prepTimeMinutes: 15,
  cookTimeMinutes: 30,
  image: "https://via.placeholder.com/200",
  ingredients: ["Pasta", "Tomato Sauce", "Ground Beef", "Garlic"],
  instructions: ["Cook the pasta.", "Prepare the sauce.", "Combine and serve."],
};

describe("RecipeDrawer Component", () => {
  it("renders the loader when recipe data is not available", () => {
    mockUseFetchSingleRecipe.mockReturnValue({ recipe: null });

    render(
      <MantineProvider>
        <RecipeDrawer recipeId={1} opened={true} onClose={jest.fn()} />
      </MantineProvider>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders the recipe details when recipe data is available", async () => {
    mockUseFetchSingleRecipe.mockReturnValue({ recipe: mockRecipe });

    render(
      <MantineProvider>
        <RecipeDrawer recipeId={1} opened={true} onClose={jest.fn()} />
      </MantineProvider>
    );

    expect(await screen.findByText("Spaghetti Bolognese")).toBeInTheDocument();
    expect(screen.getByText("Easy")).toBeInTheDocument();
    expect(screen.getByText("Prep time: 15''")).toBeInTheDocument();
    expect(screen.getByText("Cooking time: 30''")).toBeInTheDocument();

    expect(screen.getByAltText("Spaghetti Bolognese")).toHaveAttribute(
      "src",
      "https://via.placeholder.com/200"
    );

    mockRecipe.ingredients.forEach((ingredient) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });

    mockRecipe.instructions.forEach((instruction) => {
      expect(screen.getByText(instruction)).toBeInTheDocument();
    });
  });

  it("calls the onClose function when the drawer is closed", () => {
    const onCloseMock = jest.fn();

    render(
      <MantineProvider>
        <RecipeDrawer recipeId={1} opened={true} onClose={onCloseMock} />
      </MantineProvider>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
