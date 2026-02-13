import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import AddRecipe from '../pages/AddRecipe';
import Planner from '../pages/Planner';
import NotFound from '../pages/NotFound';
import RecipeDetails from '../features/recipes/RecipeDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="add-recipe" element={<AddRecipe />} />
        <Route path="recipe/:id" element={<RecipeDetails />} />
        <Route path="planner" element={<Planner />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;