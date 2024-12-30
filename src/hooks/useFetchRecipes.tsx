import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../models";

const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/recipes")
      .then((response) => {
        if (response.data?.recipes) {
          setRecipes(response.data.recipes);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { recipes, loading };
};

export default useFetchRecipes;
