import {
  Badge,
  Divider,
  Drawer,
  Flex,
  Image,
  List,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import useFetchSingleRecipe from "../hooks/useFetchSingleRecipe";
import { DrawerProps } from "../models";

const RecipeDrawer = ({ recipeId, opened, onClose }: DrawerProps) => {
  const { recipe } = useFetchSingleRecipe(recipeId);

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size="md"
      position="right"
      closeButtonProps={{ "aria-label": "close drawer" }}
    >
      {recipe ? (
        <>
          <Title order={2} mb={10}>
            {recipe.name}
          </Title>
          <Flex gap="sm">
            <Badge color="pink"> {recipe.difficulty} </Badge>
            <Badge color="yellow">Prep time: {recipe.prepTimeMinutes}'' </Badge>
            <Badge color="orange">
              Cooking time: {recipe.cookTimeMinutes}''
            </Badge>
          </Flex>

          <Image
            src={recipe.image}
            alt={recipe.name}
            mt="md"
            height={200}
            radius={15}
          />
          <Text mt="sm">
            <strong>Ingredients:</strong>{" "}
          </Text>

          <Divider my="md" />

          <List size="sm">
            {recipe.ingredients.map((ingredient: string, i: number) => {
              return <List.Item key={i}>{ingredient}</List.Item>;
            })}
          </List>

          <Text mt="sm">
            <strong>Instructions:</strong>{" "}
          </Text>

          <Divider my="md" />

          <List size="sm" type="ordered">
            {recipe.instructions.map((instr: string, i: number) => {
              return <List.Item key={i}>{instr}</List.Item>;
            })}
          </List>
        </>
      ) : (
        <Loader data-testid="loader" />
      )}
    </Drawer>
  );
};

export default RecipeDrawer;
