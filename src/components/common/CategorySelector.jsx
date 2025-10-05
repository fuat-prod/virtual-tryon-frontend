import { useState } from 'react';

const categories = [
  { value: 'upper_body', label: 'Upper Body', icon: '👔', description: 'T-shirts, Shirts, Jackets' },
  { value: 'lower_body', label: 'Lower Body', icon: '👖', description: 'Pants, Jeans, Shorts' },
  { value: 'dresses', label: 'Dress', icon: '👗', description: 'Dresses, Gowns, Robes' }
];

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCat = categories.find(cat => cat.value === selectedCategory) || categories[0];

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg mb-6">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white text-sm mr-3">
          👗
        </span>
        Select Category
      </h3>
      <p className="text-sm text-gray-600 mb-4">Choose clothing type to try on</p>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-left flex items-center justify-between hover:border-purple-500 focus:border-purple-500 focus:outline-none"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedCat.icon}</span>
            <div>
              <div className="font-semibold text-gray-800">{selectedCat.label}</div>
              <div className="text-sm text-gray-500 hidden md:block">{selectedCat.description}</div>
            </div>
          </div>
          <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  onCategoryChange(category.value);
                  setIsOpen(false);
                }}
                className={`w-full p-4 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                  selectedCategory === category.value ? 'bg-purple-50 border-l-4 border-purple-500' : ''
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{category.label}</div>
                  <div className="text-sm text-gray-500">{category.description}</div>
                </div>
                {selectedCategory === category.value && (
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
