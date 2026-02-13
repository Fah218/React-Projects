import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../features/recipes/recipesSlice';
import mealPlannerReducer from '../features/mealPlanner/mealPlannerSlice';
import shoppingListReducer from '../features/shoppingList/shoppingListSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    mealPlanner: mealPlannerReducer,
    shoppingList: shoppingListReducer,
    reviews: reviewsReducer,
  },
});