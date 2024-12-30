import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import truncateInstructionsHook from "../hooks/useTruncateInstructions";
import { CardProps } from "../models";

const RecipeCard = ({ name, image, difficulty, instructions }: CardProps) => {
  const truncatedInstructions = truncateInstructionsHook(instructions);
  return (
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

      <Button color="blue" fullWidth mt="md" radius="md">
        See full recipe
      </Button>
    </Card>
  );
};

export default RecipeCard;
