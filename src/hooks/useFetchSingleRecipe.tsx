import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../models";

const useFetchSingleRecipe = (recipeId: number) => {
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/recipes/${recipeId}`,
        );
        setRecipe(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (recipeId > -1) {
      fetchRecipe();
    }
  }, [recipeId]);

  return { recipe };
};

export default useFetchSingleRecipe;
