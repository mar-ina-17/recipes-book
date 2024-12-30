import { Grid } from "@mantine/core";
import fetchRecipesHook from "../hooks/useFetchRecipes";
import { Recipe } from "../models";
import RecipeCard from "./RecipeCard";

const RecipesContainer = () => {
  const { recipes } = fetchRecipesHook();
  return (
    <Grid mx={40} mt={90} mb={30}>
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
