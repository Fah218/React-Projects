/**
 * Generate a shopping list from an array of recipes
 * Combines and deduplicates ingredients
 */
export const generateShoppingList = (recipes) => {
  const ingredientsMap = new Map();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const normalized = ingredient.toLowerCase().trim();
      if (ingredientsMap.has(normalized)) {
        ingredientsMap.set(normalized, ingredientsMap.get(normalized) + 1);
      } else {
        ingredientsMap.set(normalized, 1);
      }
    });
  });

  return Array.from(ingredientsMap.entries()).map(([name, count]) => ({
    name: name,
    count: count,
  }));
};

/**
 * Combine duplicate ingredients intelligently
 */
export const combineIngredients = (ingredients) => {
  const combined = {};

  ingredients.forEach((ingredient) => {
    const normalized = ingredient.toLowerCase().trim();
    if (combined[normalized]) {
      combined[normalized]++;
    } else {
      combined[normalized] = 1;
    }
  });

  return Object.entries(combined).map(([name, count]) => 
    count > 1 ? `${name} (x${count})` : name
  );
};