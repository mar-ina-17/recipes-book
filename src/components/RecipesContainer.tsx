import { Grid } from "@mantine/core";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { Recipe } from "../models";
import RecipeCard from "./RecipeCard";

const RecipesContainer = () => {
  const { recipes } = useFetchRecipes();
  return (
    <Grid mx={40} my={30}>
      {recipes &&
        recipes.map((recipe: Recipe) => {
          return (
            <Grid.Col span={4} key={recipe.id}>
              <RecipeCard key={recipe.id} {...recipe} />
            </Grid.Col>
          );
        })}
    </Grid>
  );
};

export default RecipesContainer;
