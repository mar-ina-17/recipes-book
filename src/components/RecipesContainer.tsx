import { Grid, Loader } from "@mantine/core";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { Recipe } from "../models";
import RecipeCard from "./RecipeCard";

const RecipesContainer = () => {
  const { recipes, loading } = useFetchRecipes();
  return (
    <Grid mx={40} my={30}>
      {recipes &&
        !loading &&
        recipes.map((recipe: Recipe) => {
          return (
            <Grid.Col span={4} key={recipe.id}>
              <RecipeCard key={recipe.id} {...recipe} />
            </Grid.Col>
          );
        })}
      {loading && <Loader color="grape" size="xl" type="dots" />}
    </Grid>
  );
};

export default RecipesContainer;
