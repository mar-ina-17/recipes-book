import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import axios from "axios";
import { Recipe } from "../../models";
import useFetchSingleRecipe from "../useFetchSingleRecipe";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockRecipe: Recipe = {
  id: 1,
  name: "Spaghetti Bolognese",
  ingredients: ["Pasta", "Meat", "Tomatoes"],
  instructions: ["Cook the pasta, prepare the sauce, and mix together."],
  difficulty: "Easy",
  image: "",
  cookTimeMinutes: 30,
  prepTimeMinutes: 15,
  tags: [],
};

const TestComponent = ({ recipeId }: { recipeId: number }) => {
  const { recipe } = useFetchSingleRecipe(recipeId);

  return (
    <div>
      {recipe ? (
        <div data-testid="recipe">
          <h2>{recipe.name}</h2>
          <p>{recipe.instructions}</p>
        </div>
      ) : (
        <div data-testid="loading">Loading...</div>
      )}
    </div>
  );
};

describe("useFetchSingleRecipe", () => {
  it("fetches and displays the recipe for a valid recipeId", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockRecipe });

    await act(async () => {
      render(<TestComponent recipeId={1} />);
    });

    await waitFor(() =>
      expect(screen.getByText("Spaghetti Bolognese")).toBeInTheDocument()
    );
    expect(
      screen.getByText("Cook the pasta, prepare the sauce, and mix together.")
    ).toBeInTheDocument();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://dummyjson.com/recipes/1"
    );
  });

  it("handles errors gracefully", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    await act(async () => {
      render(<TestComponent recipeId={1} />);
    });


    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://dummyjson.com/recipes/1"
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

});
