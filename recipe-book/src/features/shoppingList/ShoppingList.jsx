import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllItems, 
  addItem, 
  toggleItem, 
  removeItem, 
  clearCheckedItems, 
  clearAllItems 
} from './shoppingListSlice';
import { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectAllItems);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      dispatch(addItem(newItem.trim()));
      setNewItem('');
    }
  };

  const uncheckedCount = items.filter(item => !item.checked).length;
  const checkedCount = items.filter(item => item.checked).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping List</h1>
            <p className="text-gray-600 mt-1">
              {uncheckedCount} items to buy • {checkedCount} completed
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(clearCheckedItems())}
              disabled={checkedCount === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Clear Checked
            </button>
            <button
              onClick={() => {
                if (window.confirm('Clear all items?')) {
                  dispatch(clearAllItems());
                }
              }}
              disabled={items.length === 0}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Add Item Form */}
        <form onSubmit={handleAddItem} className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-2"
          >
            <FiPlus size={20} />
            Add
          </button>
        </form>
      </div>

      {/* Shopping List Items */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your shopping list is empty</h3>
            <p className="text-gray-600 mb-6">
              Add items manually or generate from your recipes
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {/* Unchecked Items */}
            {items.filter(item => !item.checked).length > 0 && (
              <div>
                <div className="bg-gray-50 px-6 py-3">
                  <h3 className="font-semibold text-gray-700">To Buy ({uncheckedCount})</h3>
                </div>
                {items
                  .filter(item => !item.checked)
                  .map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                    >
                      <button
                        onClick={() => dispatch(toggleItem(item.id))}
                        className="flex-shrink-0 w-6 h-6 border-2 border-gray-300 rounded-md hover:border-orange-500 transition-colors"
                      />
                      <span className="flex-1 text-gray-900">{item.name}</span>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
              </div>
            )}

            {/* Checked Items */}
            {items.filter(item => item.checked).length > 0 && (
              <div>
                <div className="bg-gray-50 px-6 py-3">
                  <h3 className="font-semibold text-gray-700">Completed ({checkedCount})</h3>
                </div>
                {items
                  .filter(item => item.checked)
                  .map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                    >
                      <button
                        onClick={() => dispatch(toggleItem(item.id))}
                        className="flex-shrink-0 w-6 h-6 bg-green-500 border-2 border-green-500 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
                      >
                        <FiCheck className="text-white" size={16} />
                      </button>
                      <span className="flex-1 text-gray-500 line-through">{item.name}</span>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 Tip</h3>
        <p className="text-blue-800 text-sm">
          Visit any recipe and click "Add to Shopping List" to automatically add all ingredients to your list!
        </p>
      </div>
    </div>
  );
};

export default ShoppingList;