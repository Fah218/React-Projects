import { Link } from 'react-router-dom';
import { FiClock, FiUsers, FiStar } from 'react-icons/fi';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
                <img
                    src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                    {recipe.category}
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{recipe.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{recipe.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <FiClock className="text-orange-500" />
                        <span>{recipe.prepTime + recipe.cookTime}m</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FiUsers className="text-orange-500" />
                        <span>{recipe.servings}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-500 fill-yellow-500" />
                        <span>{recipe.rating || 0}</span>
                    </div>
                </div>

                <Link
                    to={`/recipe/${recipe.id}`}
                    className="block w-full text-center py-2 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors"
                >
                    View Recipe
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;
