import { useForm, useFieldArray } from 'react-hook-form';
import { FiPlus, FiX, FiImage } from 'react-icons/fi';
import { useState } from 'react';

const RecipeForm = ({ onSubmit, initialData = null, submitLabel = 'Add Recipe' }) => {
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      category: 'Italian',
      prepTime: 30,
      cookTime: 30,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [''],
      steps: [''],
      image: '',
    }
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
    control,
    name: 'steps',
  });

  const handleImageChange = (e) => {
    const url = e.target.value;
    setImagePreview(url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Title *
            </label>
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="e.g., Spaghetti Carbonara"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              placeholder="Brief description of your recipe..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                {...register('category')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option>Italian</option>
                <option>Indian</option>
                <option>Chinese</option>
                <option>Mexican</option>
                <option>American</option>
                <option>Thai</option>
                <option>Japanese</option>
                <option>Mediterranean</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                {...register('difficulty')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time (min)</label>
              <input
                {...register('prepTime', { valueAsNumber: true })}
                type="number"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cook Time (min)</label>
              <input
                {...register('cookTime', { valueAsNumber: true })}
                type="number"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
              <input
                {...register('servings', { valueAsNumber: true })}
                type="number"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <div className="space-y-3">
              <input
                {...register('image')}
                type="text"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="https://example.com/image.jpg"
              />
              {imagePreview && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Ingredients</h3>
          <button
            type="button"
            onClick={() => appendIngredient('')}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <FiPlus size={18} />
            Add Ingredient
          </button>
        </div>

        <div className="space-y-3">
          {ingredientFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`ingredients.${index}`)}
                type="text"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder={`Ingredient ${index + 1}`}
              />
              {ingredientFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Instructions</h3>
          <button
            type="button"
            onClick={() => appendStep('')}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <FiPlus size={18} />
            Add Step
          </button>
        </div>

        <div className="space-y-3">
          {stepFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm mt-2">
                {index + 1}
              </div>
              <textarea
                {...register(`steps.${index}`)}
                rows="2"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                placeholder={`Step ${index + 1}`}
              />
              {stepFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors shadow-md"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default RecipeForm;