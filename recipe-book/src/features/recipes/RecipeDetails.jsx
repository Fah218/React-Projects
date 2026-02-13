import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectRecipeById, deleteRecipe } from './recipesSlice';
import { addReview, selectReviewsByRecipeId, selectAverageRating } from '../reviews/reviewsSlice';
import { addMealToPlan } from '../mealPlanner/mealPlannerSlice';
import { generateFromRecipes } from '../shoppingList/shoppingListSlice';
import { FiClock, FiUsers, FiTrash2, FiShoppingCart, FiCalendar, FiStar } from 'react-icons/fi';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { format } from 'date-fns';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const recipe = useSelector(state => selectRecipeById(state, id));
  const reviews = useSelector(state => selectReviewsByRecipeId(state, id));
  const averageRating = useSelector(state => selectAverageRating(state, id));

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedMealType, setSelectedMealType] = useState('lunch');
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600">Recipe not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    dispatch(deleteRecipe(id));
    navigate('/');
  };

  const handleAddToShoppingList = () => {
    dispatch(generateFromRecipes(recipe.ingredients));
    alert('Ingredients added to shopping list!');
  };

  const handleAddToMealPlan = () => {
    dispatch(addMealToPlan({
      date: selectedDate,
      mealType: selectedMealType,
      recipeId: id,
    }));
    setShowMealPlanModal(false);
    alert('Added to meal plan!');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(addReview({ recipeId: id, rating, comment }));
      setComment('');
      setRating(5);
    }
  };

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Image */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="relative h-96">
          <img
            src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className="text-sm font-semibold uppercase tracking-wide mb-2 block">
              {recipe.category}
            </span>
            <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
            <p className="text-lg text-gray-200">{recipe.description}</p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FiClock className="mx-auto mb-2 text-orange-600" size={28} />
          <div className="text-2xl font-bold text-gray-900">{recipe.prepTime + recipe.cookTime}</div>
          <div className="text-sm text-gray-600">Total Minutes</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FiUsers className="mx-auto mb-2 text-orange-600" size={28} />
          <div className="text-2xl font-bold text-gray-900">{recipe.servings}</div>
          <div className="text-sm text-gray-600">Servings</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-2 ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty}
          </div>
          <div className="text-sm text-gray-600">Difficulty</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FiStar className="mx-auto mb-2 text-yellow-500 fill-yellow-500" size={28} />
          <div className="text-2xl font-bold text-gray-900">{averageRating || 'N/A'}</div>
          <div className="text-sm text-gray-600">{reviews.length} Reviews</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleAddToShoppingList}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
        >
          <FiShoppingCart size={20} />
          Add to Shopping List
        </button>
        <button
          onClick={() => setShowMealPlanModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
        >
          <FiCalendar size={20} />
          Add to Meal Plan
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md ml-auto"
        >
          <FiTrash2 size={20} />
          Delete Recipe
        </button>
      </div>

      {/* Ingredients and Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  ✓
                </span>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <span className="text-gray-700 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

        {/* Add Review Form */}
        <form onSubmit={handleSubmitReview} className="mb-8 pb-8 border-b border-gray-200">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-3xl focus:outline-none"
                >
                  <FiStar
                    className={star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              placeholder="Share your experience with this recipe..."
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Submit Review
          </button>
        </form>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        size={16}
                        className={star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(review.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Recipe?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this recipe? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Meal Plan Modal */}
      <Modal isOpen={showMealPlanModal} onClose={() => setShowMealPlanModal(false)}>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Add to Meal Plan</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
            <select
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={() => setShowMealPlanModal(false)}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToMealPlan}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Add to Plan
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RecipeDetails;