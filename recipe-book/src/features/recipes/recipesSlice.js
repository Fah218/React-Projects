import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialRecipes = [
  {
    id: '1',
    title: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish with eggs, cheese, and pancetta',
    category: 'Italian',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '400g spaghetti',
      '200g pancetta',
      '4 large eggs',
      '100g Parmesan cheese',
      'Black pepper',
      'Salt'
    ],
    steps: [
      'Cook spaghetti according to package instructions',
      'Fry pancetta until crispy',
      'Beat eggs with grated Parmesan',
      'Drain pasta, mix with pancetta',
      'Remove from heat, stir in egg mixture',
      'Season with black pepper and serve'
    ],
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Creamy and flavorful Indian curry with tender chicken',
    category: 'Indian',
    prepTime: 30,
    cookTime: 40,
    servings: 6,
    difficulty: 'Medium',
    ingredients: [
      '800g chicken breast',
      '400ml coconut cream',
      '400g tomato puree',
      '2 onions',
      'Tikka masala spice mix',
      'Garlic and ginger',
      'Fresh cilantro'
    ],
    steps: [
      'Marinate chicken in yogurt and spices',
      'Grill or pan-fry chicken pieces',
      'Sauté onions, garlic, and ginger',
      'Add tomato puree and spices',
      'Stir in coconut cream',
      'Add chicken and simmer',
      'Garnish with cilantro'
    ],
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Homemade Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella and basil',
    category: 'Italian',
    prepTime: 90,
    cookTime: 15,
    servings: 2,
    difficulty: 'Hard',
    ingredients: [
      '500g pizza dough',
      '400g San Marzano tomatoes',
      '250g fresh mozzarella',
      'Fresh basil leaves',
      'Olive oil',
      'Salt',
      'Garlic'
    ],
    steps: [
      'Prepare pizza dough and let rise',
      'Make tomato sauce with crushed tomatoes',
      'Roll out dough into circles',
      'Spread sauce on dough',
      'Add torn mozzarella',
      'Bake at 250°C for 12-15 minutes',
      'Top with fresh basil and olive oil'
    ],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    createdAt: new Date().toISOString(),
  }
];

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: initialRecipes,
    filters: {
      search: '',
      category: 'All',
      difficulty: 'All',
      maxPrepTime: 180,
    },
  },
  reducers: {
    addRecipe: (state, action) => {
      state.items.unshift({
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      });
    },
    updateRecipe: (state, action) => {
      const index = state.items.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteRecipe: (state, action) => {
      state.items = state.items.filter(r => r.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        category: 'All',
        difficulty: 'All',
        maxPrepTime: 180,
      };
    },
  },
});

export const { addRecipe, updateRecipe, deleteRecipe, setFilters, resetFilters } = recipesSlice.actions;

export const selectAllRecipes = (state) => state.recipes.items;
export const selectRecipeById = (state, recipeId) => 
  state.recipes.items.find(recipe => recipe.id === recipeId);
export const selectFilters = (state) => state.recipes.filters;

export const selectFilteredRecipes = (state) => {
  const { items, filters } = state.recipes;
  return items.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.category === 'All' || recipe.category === filters.category;
    const matchesDifficulty = filters.difficulty === 'All' || recipe.difficulty === filters.difficulty;
    const matchesTime = recipe.prepTime + recipe.cookTime <= filters.maxPrepTime;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTime;
  });
};

export default recipesSlice.reducer;