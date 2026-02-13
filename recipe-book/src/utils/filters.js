/**
 * Filter recipes based on search query
 */
export const filterBySearch = (recipes, searchQuery) => {
  if (!searchQuery.trim()) return recipes;
  
  const query = searchQuery.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.category.toLowerCase().includes(query)
  );
};

/**
 * Filter recipes by category
 */
export const filterByCategory = (recipes, category) => {
  if (category === 'All') return recipes;
  return recipes.filter((recipe) => recipe.category === category);
};

/**
 * Filter recipes by difficulty
 */
export const filterByDifficulty = (recipes, difficulty) => {
  if (difficulty === 'All') return recipes;
  return recipes.filter((recipe) => recipe.difficulty === difficulty);
};

/**
 * Filter recipes by maximum time
 */
export const filterByTime = (recipes, maxTime) => {
  return recipes.filter(
    (recipe) => recipe.prepTime + recipe.cookTime <= maxTime
  );
};

/**
 * Apply all filters to recipes
 */
export const applyAllFilters = (recipes, filters) => {
  let filtered = recipes;

  filtered = filterBySearch(filtered, filters.search);
  filtered = filterByCategory(filtered, filters.category);
  filtered = filterByDifficulty(filtered, filters.difficulty);
  filtered = filterByTime(filtered, filters.maxPrepTime);

  return filtered;
};

/**
 * Sort recipes by different criteria
 */
export const sortRecipes = (recipes, sortBy) => {
  const sorted = [...recipes];

  switch (sortBy) {
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'time':
      return sorted.sort(
        (a, b) =>
          a.prepTime + a.cookTime - (b.prepTime + b.cookTime)
      );
    case 'difficulty':
      const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
      return sorted.sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    default:
      return sorted;
  }
};