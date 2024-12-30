import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { CardProps } from "../models";

const RecipeCard = ({ name, image, difficulty, instructions }: CardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt={name}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>
        <Badge color="pink">{difficulty}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {instructions}...
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        See full recipe
      </Button>
    </Card>
  );
};

export default RecipeCard;
