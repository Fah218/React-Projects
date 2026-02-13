import { useState } from 'react';
import MealPlanner from '../features/mealPlanner/MealPlanner';
import ShoppingList from '../features/shoppingList/ShoppingList';
import { FiCalendar, FiShoppingCart } from 'react-icons/fi';

const Planner = () => {
  const [activeTab, setActiveTab] = useState('meal-plan');

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-md p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('meal-plan')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'meal-plan'
              ? 'bg-orange-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FiCalendar size={20} />
          Meal Planner
        </button>
        <button
          onClick={() => setActiveTab('shopping-list')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'shopping-list'
              ? 'bg-orange-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FiShoppingCart size={20} />
          Shopping List
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'meal-plan' ? <MealPlanner /> : <ShoppingList />}
    </div>
  );
};

export default Planner;