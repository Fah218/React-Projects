import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters, selectFilters } from './recipesSlice';
import { FiSearch, FiRotateCcw } from 'react-icons/fi';

const RecipeFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const categories = ['All', 'Italian', 'Indian', 'Chinese', 'Mexican', 'American', 'Thai', 'Japanese', 'Mediterranean'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filter Recipes</h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
        >
          <FiRotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search recipes..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange('category', category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filters.category === category
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty
          </label>
          <div className="flex gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => handleFilterChange('difficulty', difficulty)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filters.difficulty === difficulty
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Max Prep Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Total Time: {filters.maxPrepTime} minutes
          </label>
          <input
            type="range"
            min="15"
            max="180"
            step="15"
            value={filters.maxPrepTime}
            onChange={(e) => handleFilterChange('maxPrepTime', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>15 min</span>
            <span>180 min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;