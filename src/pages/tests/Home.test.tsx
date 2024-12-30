import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import RecipesContainer from "../../components/RecipesContainer";
import Home from "../Home";

jest.mock("../../components/RecipesContainer");

describe("Home Component", () => {
  beforeEach(() => {
    (RecipesContainer as jest.Mock).mockImplementation(() => (
      <div data-testid="recipes-container">Mocked RecipesContainer</div>
    ));
  });

  it("renders the header and description", () => {
    render(
      <MantineProvider>
        <Home />
      </MantineProvider>
    );

    expect(
      screen.getByRole("heading", { name: /welcome to my cookbook!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/discover delicious recipes from around the world./i)
    ).toBeInTheDocument();
  });

  it("renders the RecipesContainer component", () => {
    render(
      <MantineProvider>
        <Home />
      </MantineProvider>
    );

    expect(screen.getByTestId("recipes-container")).toBeInTheDocument();
  });

  it("applies correct styles to the container", () => {
    render(
      <MantineProvider>
        <Home />
      </MantineProvider>
    );

    const container = screen.getByRole("heading", {
      name: /welcome to my cookbook!/i,
    }).parentElement;

    expect(container).toHaveStyle({
      textAlign: "center",
      maxWidth: "400px",
      marginTop: "20px",
    });
  });
});
