import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../features/recipes/recipesSlice';
import RecipeForm from '../features/recipes/RecipeForm';

const AddRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    dispatch(addRecipe(data));
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Recipe</h1>
        <p className="text-gray-600">Share your favorite recipe with the community</p>
      </div>

      <RecipeForm onSubmit={handleSubmit} submitLabel="Add Recipe" />
    </div>
  );
};

export default AddRecipe;