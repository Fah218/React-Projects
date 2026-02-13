import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: {}, // { recipeId: [{ id, rating, comment, createdAt }] }
  },
  reducers: {
    addReview: (state, action) => {
      const { recipeId, rating, comment } = action.payload;
      if (!state.reviews[recipeId]) {
        state.reviews[recipeId] = [];
      }
      state.reviews[recipeId].push({
        id: uuidv4(),
        rating,
        comment,
        createdAt: new Date().toISOString(),
      });
    },
    deleteReview: (state, action) => {
      const { recipeId, reviewId } = action.payload;
      if (state.reviews[recipeId]) {
        state.reviews[recipeId] = state.reviews[recipeId].filter(r => r.id !== reviewId);
      }
    },
  },
});

export const { addReview, deleteReview } = reviewsSlice.actions;

export const selectReviewsByRecipeId = (state, recipeId) => 
  state.reviews.reviews[recipeId] || [];

export const selectAverageRating = (state, recipeId) => {
  const reviews = state.reviews.reviews[recipeId] || [];
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

export default reviewsSlice.reducer;