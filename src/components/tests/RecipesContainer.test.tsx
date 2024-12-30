import { MantineProvider } from "@mantine/core";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Recipe } from "../../models";
import RecipesContainer from "../RecipesContainer";

const mock = new MockAdapter(axios);

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation((message) => {
    if (
      typeof message === "string" &&
      !message.includes("Request failed with status code")
    ) {
      console.error(message);
    }
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("RecipesContainer", () => {
  afterEach(() => {
    mock.reset();
  });

  it("renders a list of recipes when the API call is successful", async () => {
    const mockRecipes: Recipe[] = [
      {
        id: 1,
        name: "Recipe 1",
        difficulty: "Easy",
        ingredients: [],
        instructions: [],
        image: "",
        cookTimeMinutes: 30,
        prepTimeMinutes: 10,
        tags: [],
      },
      {
        id: 2,
        name: "Recipe 2",
        difficulty: "Medium",
        ingredients: [],
        instructions: [],
        image: "",
        cookTimeMinutes: 45,
        prepTimeMinutes: 15,
        tags: [],
      },
    ];

    mock
      .onGet("https://dummyjson.com/recipes")
      .reply(200, { recipes: mockRecipes });

    render(
      <MantineProvider>
        <RecipesContainer />
      </MantineProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Recipe 1")).toBeInTheDocument();
      expect(screen.getByText("Recipe 2")).toBeInTheDocument();
    });
  });

  it("renders no recipes when the API call fails", async () => {
    mock.onGet("https://dummyjson.com/recipes").reply(500);

    render(
      <MantineProvider>
        <RecipesContainer />
      </MantineProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Recipe 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Recipe 2")).not.toBeInTheDocument();
    });
  });

  it("handles recipes with missing images gracefully", async () => {
    const mockRecipes: Recipe[] = [
      {
        id: 1,
        name: "Recipe 1",
        difficulty: "Easy",
        ingredients: [],
        instructions: [],
        image: "",
        cookTimeMinutes: 30,
        prepTimeMinutes: 10,
        tags: [],
      },
    ];

    mock
      .onGet("https://dummyjson.com/recipes")
      .reply(200, { recipes: mockRecipes });

    render(
      <MantineProvider>
        <RecipesContainer />
      </MantineProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Recipe 1")).toBeInTheDocument();
    });
  });
});
