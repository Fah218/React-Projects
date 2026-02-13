import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({
        id: uuidv4(),
        name: action.payload,
        checked: false,
      });
    },
    toggleItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.checked = !item.checked;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCheckedItems: (state) => {
      state.items = state.items.filter(i => !i.checked);
    },
    clearAllItems: (state) => {
      state.items = [];
    },
    generateFromRecipes: (state, action) => {
      const ingredients = action.payload;
      state.items = ingredients.map(ing => ({
        id: uuidv4(),
        name: ing,
        checked: false,
      }));
    },
  },
});

export const { 
  addItem, 
  toggleItem, 
  removeItem, 
  clearCheckedItems, 
  clearAllItems,
  generateFromRecipes 
} = shoppingListSlice.actions;

export const selectAllItems = (state) => state.shoppingList.items;
export const selectUncheckedItems = (state) => 
  state.shoppingList.items.filter(i => !i.checked);

export default shoppingListSlice.reducer;