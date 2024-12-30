import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { useState } from "react";
import truncateInstructionsHook from "../hooks/useTruncateInstructions";
import { CardProps } from "../models";
import RecipeDrawer from "./RecipeDrawer";

const RecipeCard = ({
  id,
  name,
  image,
  difficulty,
  instructions,
}: CardProps) => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  const openDrawer = () => setDrawerOpened(true);
  const closeDrawer = () => setDrawerOpened(false);

  const truncatedInstructions = truncateInstructionsHook(instructions);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Card.Section>
          <Image src={image} height={160} alt={name} />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{name}</Text>
          <Badge color="pink">{difficulty}</Badge>
        </Group>

        <Text size="sm" c="dimmed" h={80}>
          {truncatedInstructions}...
        </Text>

        <Button
          color="purple"
          fullWidth
          mt="md"
          radius="md"
          onClick={openDrawer}
        >
          See full recipe
        </Button>
      </Card>

      <RecipeDrawer recipeId={id} opened={drawerOpened} onClose={closeDrawer} />
    </>
  );
};

export default RecipeCard;
