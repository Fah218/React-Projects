import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import AddRecipe from '../pages/AddRecipe';
import Planner from '../pages/Planner';
import NotFound from '../pages/NotFound';
import RecipeDetails from '../features/recipes/RecipeDetails';

import LoginForm from '../features/auth/LoginForm';
import SignupForm from '../features/auth/SignupForm';
import RequireAuth from '../features/auth/RequireAuth';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<SignupForm />} />

        <Route element={<RequireAuth />}>
          <Route path="add-recipe" element={<AddRecipe />} />
          <Route path="planner" element={<Planner />} />
        </Route>

        <Route path="recipe/:id" element={<RecipeDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;