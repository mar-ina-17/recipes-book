export type CardProps = {
  name: string;
  image: string;
  difficulty: string;
  instructions: string;
};

export type Recipe = {
  id: number;
  name: string;
  ingredients: string[] | string;
  instructions: string;
  difficulty: string;
  image: string;
  cookTimeMinutes: number;
  prepTimeMinutes: number;
  tags: string[];
  [key: string]: any;
};
