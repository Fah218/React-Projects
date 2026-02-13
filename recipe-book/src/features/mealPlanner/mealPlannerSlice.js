import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const mealPlannerSlice = createSlice({
  name: 'mealPlanner',
  initialState: {
    meals: {}, // { '2024-01-15': { breakfast: 'recipeId', lunch: 'recipeId', dinner: 'recipeId' } }
  },
  reducers: {
    addMealToPlan: (state, action) => {
      const { date, mealType, recipeId } = action.payload;
      if (!state.meals[date]) {
        state.meals[date] = {};
      }
      state.meals[date][mealType] = recipeId;
    },
    removeMealFromPlan: (state, action) => {
      const { date, mealType } = action.payload;
      if (state.meals[date]) {
        delete state.meals[date][mealType];
        if (Object.keys(state.meals[date]).length === 0) {
          delete state.meals[date];
        }
      }
    },
    clearMealPlan: (state) => {
      state.meals = {};
    },
  },
});

export const { addMealToPlan, removeMealFromPlan, clearMealPlan } = mealPlannerSlice.actions;

export const selectMealsByDate = (state, date) => state.mealPlanner.meals[date] || {};
export const selectAllMeals = (state) => state.mealPlanner.meals;

export default mealPlannerSlice.reducer;