┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER (User Interface)                 │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Home Page  │  │  Add Recipe  │  │   Planner    │          │
│  │              │  │     Page     │  │     Page     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    REACT ROUTER (Navigation)                     │
│                      AppRoutes.jsx                               │
│                                                                   │
│  Routes:  /  →  Home                                            │
│          /add-recipe  →  AddRecipe                              │
│          /recipe/:id  →  RecipeDetails                          │
│          /planner  →  Planner                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                 REDUX STORE (Global State)                       │
│                      store.js                                    │
│                                                                   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │  recipes   │ │meal planner│ │  shopping  │ │  reviews   │  │
│  │   Slice    │ │   Slice    │ │    Slice   │ │   Slice    │  │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘  │
└─────────────────────────────────────────────────────────────────┘


USER ACTION
    ↓
COMPONENT (UI)
    ↓
DISPATCH ACTION
    ↓
REDUX REDUCER
    ↓
STATE UPDATE
    ↓
RE-RENDER COMPONENTS
    ↓
UPDATED UI



src/
│
├── main.jsx  ────────────────┐
│   └── Wraps App with Redux Provider
│                              │
├── App.jsx  ─────────────────┤
│   └── Contains BrowserRouter │
│                              │
├── routes/                    │
│   └── AppRoutes.jsx ─────────┘
│       └── Defines all routes
│
├── app/
│   └── store.js ──────────────────┐
│       └── Combines all slices     │ (GLOBAL STATE)
│                                   │
├── features/                      │
│   │                              │
│   ├── recipes/                   │
│   │   ├── recipesSlice.js ───────┤ (State Management)
│   │   │   ├── Actions: addRecipe, deleteRecipe, setFilters
│   │   │   ├── Selectors: selectFilteredRecipes, selectRecipeById
│   │   │   └── Initial State: 3 sample recipes
│   │   │                          │
│   │   ├── RecipeCard.jsx ────────┤ (UI Component)
│   │   │   └── Uses: selectAverageRating, selectReviewsByRecipeId
│   │   │                          │
│   │   ├── RecipeFilters.jsx ─────┤ (UI Component)
│   │   │   └── Dispatches: setFilters, resetFilters
│   │   │                          │
│   │   ├── RecipeForm.jsx ────────┤ (Form Component)
│   │   │   └── Uses: react-hook-form, useFieldArray
│   │   │                          │
│   │   └── RecipeDetails.jsx ─────┤ (Page Component)
│   │       └── Uses: deleteRecipe, addReview, addMealToPlan
│   │                              │
│   ├── mealPlanner/               │
│   │   ├── mealPlannerSlice.js ───┤ (State Management)
│   │   │   ├── Actions: addMealToPlan, removeMealFromPlan
│   │   │   └── State: meals object by date
│   │   │                          │
│   │   └── MealPlanner.jsx ───────┤ (UI Component)
│   │       └── Uses: date-fns for calendar logic
│   │                              │
│   ├── shoppingList/              │
│   │   ├── shoppingListSlice.js ──┤ (State Management)
│   │   │   ├── Actions: addItem, toggleItem, removeItem
│   │   │   └── State: items array
│   │   │                          │
│   │   └── ShoppingList.jsx ──────┤ (UI Component)
│   │       └── Manages: checked/unchecked items
│   │                              │
│   └── reviews/                   │
│       └── reviewsSlice.js ────────┘ (State Management)
│           ├── Actions: addReview, deleteReview
│           └── Selectors: selectAverageRating
│
├── pages/
│   ├── Home.jsx ──────────────────┐
│   │   └── Uses: RecipeCard, RecipeFilters
│   │                              │
│   ├── AddRecipe.jsx ─────────────┤ (Uses RecipeForm)
│   ├── Planner.jsx ───────────────┤ (Tab Navigation)
│   └── NotFound.jsx ──────────────┘
│
├── components/
│   ├── Navbar.jsx ────────────────┐ (Navigation Bar)
│   ├── Layout.jsx ────────────────┤ (Wraps pages with Navbar)
│   ├── Button.jsx ────────────────┤ (Reusable Button)
│   └── Modal.jsx ─────────────────┘ (Popup Dialog)
│
├── utils/
│   ├── generateShoppingList.js ───┐ (Helper Functions)
│   └── filters.js ────────────────┘
│
└── index.css ─────────────────────── (Tailwind + Custom Styles)



App.jsx
│
└── BrowserRouter
    │
    └── AppRoutes.jsx
        │
        └── Layout.jsx
            │
            ├── Navbar.jsx ──────────────────────┐
            │   └── Navigation Links              │
            │                                     │
            ├── <Outlet /> ──────────────────────┤ (Page Content)
            │   │                                 │
            │   ├── Home.jsx                     │
            │   │   ├── RecipeFilters.jsx        │
            │   │   │   └── Filter Controls      │
            │   │   │                             │
            │   │   └── RecipeCard.jsx (x3)      │
            │   │       └── Shows recipe info    │
            │   │                                 │
            │   ├── AddRecipe.jsx                │
            │   │   └── RecipeForm.jsx           │
            │   │       ├── Basic Info           │
            │   │       ├── Ingredients Array    │
            │   │       └── Steps Array          │
            │   │                                 │
            │   ├── RecipeDetails.jsx            │
            │   │   ├── Recipe Info Cards        │
            │   │   ├── Ingredients List         │
            │   │   ├── Steps List               │
            │   │   ├── Reviews Section          │
            │   │   └── Modal.jsx (x2)           │
            │   │       ├── Delete Confirmation  │
            │   │       └── Add to Meal Plan     │
            │   │                                 │
            │   └── Planner.jsx                  │
            │       ├── Tab Navigation           │
            │       ├── MealPlanner.jsx          │
            │       │   └── Calendar Grid        │
            │       │                             │
            │       └── ShoppingList.jsx         │
            │           └── Item List            │
            │                                     │
            └── Footer ──────────────────────────┘