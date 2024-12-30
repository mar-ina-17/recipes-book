export type CardProps = {
  id: number;
  name: string;
  image: string;
  difficulty: string;
  instructions: string[];
};

export type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  image: string;
  cookTimeMinutes: number;
  prepTimeMinutes: number;
  tags: string[];
  [key: string]: any;
};

export type DrawerProps = {
  recipeId: number;
  opened: boolean;
  onClose: () => void;
};
