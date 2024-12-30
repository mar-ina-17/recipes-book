import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import useFetchRecipes from "../useFetchRecipes";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

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

const TestComponent: React.FC = () => {
  const { recipes } = useFetchRecipes();

  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map((recipe) => <div key={recipe.id}>{recipe.name}</div>)
      ) : (
        <div>No recipes found</div>
      )}
    </div>
  );
};

describe("useFetchRecipes", () => {
  it("should fetch and display recipes on successful API call", async () => {
    const mockRecipes = [
      { id: 1, name: "Spaghetti" },
      { id: 2, name: "Tacos" },
    ];

    mockedAxios.get.mockResolvedValue({ data: { recipes: mockRecipes } });

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByText("Spaghetti")).toBeInTheDocument()
    );
    expect(screen.getByText("Tacos")).toBeInTheDocument();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://dummyjson.com/recipes"
    );
  });

  it("should display 'No recipes found' if API call fails", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    render(<TestComponent />);

    await waitFor(() =>
      expect(screen.getByText("No recipes found")).toBeInTheDocument()
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://dummyjson.com/recipes"
    );
  });
});
