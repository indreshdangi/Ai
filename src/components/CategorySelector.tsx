
import React from 'react';

export type Category = 'Personal' | 'Coding' | 'Image' | 'Marketing' | 'Other';

interface CategorySelectorProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  activeCategory, 
  setActiveCategory 
}) => {
  const categories: Category[] = ['Personal', 'Coding', 'Image', 'Marketing', 'Other'];

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${
            activeCategory === category ? 'active' : 'inactive'
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
