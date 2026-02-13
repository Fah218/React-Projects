import { useSelector } from 'react-redux';
import { selectFilteredRecipes } from '../features/recipes/recipesSlice';
import RecipeCard from '../features/recipes/RecipeCard';
import RecipeFilters from '../features/recipes/RecipeFilters';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = () => {
  const filteredRecipes = useSelector(selectFilteredRecipes);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-xl p-8 md:p-12 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Delicious Recipes
        </h1>
        <p className="text-lg md:text-xl text-orange-100 mb-6 max-w-2xl">
          Explore thousands of recipes, plan your meals, and create shopping lists with ease.
        </p>
        <Link
          to="/add-recipe"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-bold shadow-lg"
        >
          <FiPlus size={20} />
          Add Your Recipe
        </Link>
      </div>

      {/* Filters */}
      <RecipeFilters />

      {/* Recipe Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or add a new recipe
            </p>
            <Link
              to="/add-recipe"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              <FiPlus size={20} />
              Add Recipe
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;