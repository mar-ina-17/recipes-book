import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import useTruncateInstructions from "../../hooks/useTruncateInstructions";
import RecipeCard from "../RecipeCard";
import RecipeDrawer from "../RecipeDrawer";

jest.mock("../../hooks/useTruncateInstructions");
jest.mock("../RecipeDrawer");

const mockTruncateInstructions = useTruncateInstructions as jest.Mock;
const mockRecipeDrawer = RecipeDrawer as jest.Mock;

describe("RecipeCard Component", () => {
  beforeEach(() => {
    mockTruncateInstructions.mockImplementation((instructions) =>
      instructions?.slice(0, 150),
    );
    mockRecipeDrawer.mockImplementation(({ opened, onClose }) =>
      opened ? (
        <div data-testid="recipe-drawer">
          Mocked RecipeDrawer
          <button onClick={onClose} data-testid="close-drawer-button">
            Close
          </button>
        </div>
      ) : null,
    );
  });

  const mockProps = {
    id: 1,
    name: "Spaghetti Bolognese",
    image: "https://via.placeholder.com/150",
    difficulty: "Easy",
    instructions: ["Cook the pasta, prepare the sauce, and mix together."],
  };

  it("renders the recipe card with all details", () => {
    render(
      <MantineProvider>
        <RecipeCard {...mockProps} />
      </MantineProvider>,
    );

    expect(screen.getByText("Spaghetti Bolognese")).toBeInTheDocument();
    expect(screen.getByText("Easy")).toBeInTheDocument();
    expect(screen.getByAltText("Spaghetti Bolognese")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /see full recipe/i }),
    ).toBeInTheDocument();
  });

  it("uses truncateInstructionsHook to truncate instructions", () => {
    render(
      <MantineProvider>
        <RecipeCard {...mockProps} />
      </MantineProvider>,
    );

    expect(mockTruncateInstructions).toHaveBeenCalledWith([
      "Cook the pasta, prepare the sauce, and mix together.",
    ]);
  });

  it("opens the RecipeDrawer when the button is clicked", () => {
    render(
      <MantineProvider>
        <RecipeCard {...mockProps} />
      </MantineProvider>,
    );

    const button = screen.getByRole("button", { name: /see full recipe/i });
    fireEvent.click(button);

    expect(screen.getByTestId("recipe-drawer")).toBeInTheDocument();
  });

  it("closes the RecipeDrawer when the close button is clicked", () => {
    render(
      <MantineProvider>
        <RecipeCard {...mockProps} />
      </MantineProvider>,
    );

    const openButton = screen.getByRole("button", { name: /see full recipe/i });
    fireEvent.click(openButton);

    const closeButton = screen.getByTestId("close-drawer-button");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("recipe-drawer")).not.toBeInTheDocument();
  });
});
