import { useSelector, useDispatch } from 'react-redux';
import { selectAllMeals, removeMealFromPlan, clearMealPlan } from './mealPlannerSlice';
import { selectAllRecipes } from '../recipes/recipesSlice';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';
import { useState } from 'react';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MealPlanner = () => {
  const dispatch = useDispatch();
  const meals = useSelector(selectAllMeals);
  const recipes = useSelector(selectAllRecipes);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  const getRecipeById = (recipeId) => recipes.find(r => r.id === recipeId);

  const getMealForDateAndType = (date, mealType) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const dayMeals = meals[dateString];
    if (dayMeals && dayMeals[mealType]) {
      return getRecipeById(dayMeals[mealType]);
    }
    return null;
  };

  const handleRemoveMeal = (date, mealType) => {
    dispatch(removeMealFromPlan({ date: format(date, 'yyyy-MM-dd'), mealType }));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear the entire meal plan?')) {
      dispatch(clearMealPlan());
    }
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Meal Planner</h1>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FiTrash2 size={18} />
            Clear All
          </button>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousWeek}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Previous Week
          </button>

          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
            </div>
            <button
              onClick={goToCurrentWeek}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Today
            </button>
          </div>

          <button
            onClick={goToNextWeek}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Next Week →
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4 bg-gray-50 font-semibold text-gray-700 border-r border-gray-200">
            Meal
          </div>
          {weekDays.map((day) => (
            <div
              key={day.toString()}
              className={`p-4 text-center border-r border-gray-200 last:border-r-0 ${
                isSameDay(day, new Date()) ? 'bg-orange-50' : 'bg-gray-50'
              }`}
            >
              <div className="font-semibold text-gray-900">{format(day, 'EEE')}</div>
              <div className={`text-sm ${isSameDay(day, new Date()) ? 'text-orange-600 font-bold' : 'text-gray-500'}`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>

        {mealTypes.map((mealType) => (
          <div key={mealType} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
            <div className="p-4 bg-gray-50 font-semibold text-gray-700 capitalize border-r border-gray-200">
              {mealType}
            </div>
            {weekDays.map((day) => {
              const recipe = getMealForDateAndType(day, mealType);
              return (
                <div
                  key={`${day}-${mealType}`}
                  className={`p-2 border-r border-gray-200 last:border-r-0 min-h-[100px] ${
                    isSameDay(day, new Date()) ? 'bg-orange-50/30' : ''
                  }`}
                >
                  {recipe ? (
                    <div className="relative bg-white rounded-lg p-3 shadow-sm border border-gray-200 group h-full">
                      <button
                        onClick={() => handleRemoveMeal(day, mealType)}
                        className="absolute top-1 right-1 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                      >
                        <FiX size={14} />
                      </button>
                      <Link to={`/recipe/${recipe.id}`}>
                        <div className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors mb-1">
                          {recipe.title}
                        </div>
                        <div className="text-xs text-gray-500">{recipe.category}</div>
                      </Link>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                      No meal
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 How to use Meal Planner</h3>
        <p className="text-blue-800 text-sm">
          Go to any recipe details page and click "Add to Meal Plan" to schedule your meals for the week. 
          You can plan breakfast, lunch, and dinner for each day!
        </p>
      </div>
    </div>
  );
};

export default MealPlanner;