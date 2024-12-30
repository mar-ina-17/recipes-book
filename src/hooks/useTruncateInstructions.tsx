import { useMemo } from "react";

const useTruncateInstructions = (
  ingredients: string | string[] | null | undefined,
): string => {
  return useMemo(() => {
    if (Array.isArray(ingredients)) {
      return ingredients.join(" ").slice(0, 150);
    } else if (typeof ingredients === "string") {
      return ingredients.slice(0, 150);
    }
    return "";
  }, [ingredients]);
};

export default useTruncateInstructions;
