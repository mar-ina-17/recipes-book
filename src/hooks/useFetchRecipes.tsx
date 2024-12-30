import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../models";

const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const fetchData = () => {
    axios
      .get("https://dummyjson.com/recipes")
      .then((response) => {
        console.log(response.data);
        if (response.data?.recipes) {
          setRecipes(response.data.recipes);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { recipes };
};

export default useFetchRecipes;
