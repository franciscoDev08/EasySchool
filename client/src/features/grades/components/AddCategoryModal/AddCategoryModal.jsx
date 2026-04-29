import { useState, useEffect } from 'react';
import { BackgroundBlackBlur } from '../../../../components/common/BackgroundBlackBlur';
import './AddCategoryModal.scss';

export const AddCategoryModal = ({ isOpen, onClose, initialCategories, onSave }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setCategories([...initialCategories]);
    }
  }, [isOpen, initialCategories]);

  if (!isOpen) return null;

  const handleTitleChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].title = value;
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { id: Date.now().toString(), title: `Título ${categories.length + 1}` }]);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <>
      <BackgroundBlackBlur change={true} />
      <div className="add-category-modal">
        <div className="add-category-modal__content">
          <button className="add-category-modal__close" onClick={onClose}>✖</button>
          <div className="add-category-modal__inputs">
            {categories.map((cat, idx) => (
              <div key={cat.id} className="add-category-modal__input-group">
                <label>{cat.title || `Título ${idx + 1}`}</label>
                <div className="add-category-modal__input-wrapper">
                  <input
                    type="text"
                    value={cat.title}
                    onChange={(e) => handleTitleChange(idx, e.target.value)}
                  />
                  <button 
                    className="add-category-modal__delete-cat" 
                    onClick={() => handleDeleteCategory(cat.id)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
            <button className="add-category-modal__add-btn" onClick={handleAddCategory}>+</button>
          </div>
          <button className="add-category-modal__save-btn" onClick={() => onSave(categories)}>
            Agregar categorías
          </button>
        </div>
      </div>
    </>
  );
};
