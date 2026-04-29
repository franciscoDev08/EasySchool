import { useState, useEffect } from 'react';
import { BackgroundBlackBlur } from '../../../../components/common/BackgroundBlackBlur';
import './AddGradesModal.scss';

export const AddGradesModal = ({ isOpen, onClose, student, categories, currentTrimester, onSave }) => {
  const [grades, setGrades] = useState({});

  useEffect(() => {
    if (isOpen && student) {
      const trimesterGrades = student.gradesByTrimester[currentTrimester] || {};
      const initialGrades = {};
      categories.forEach(cat => {
        initialGrades[cat.id] = [...(trimesterGrades[cat.id] || [])];
      });
      setGrades(initialGrades);
    }
  }, [isOpen, student, currentTrimester, categories]);

  if (!isOpen || !student) return null;

  const handleGradeChange = (catId, index, value) => {
    const newGrades = { ...grades };
    newGrades[catId][index] = value;
    setGrades(newGrades);
  };

  const handleAddGradeInput = (catId) => {
    const newGrades = { ...grades };
    newGrades[catId].push('');
    setGrades(newGrades);
  };

  const handleDeleteGrade = (catId, index) => {
    const newGrades = { ...grades };
    newGrades[catId].splice(index, 1);
    setGrades(newGrades);
  };

  const handleSave = () => {
    // filter out empty values before saving
    const cleanedGrades = {};
    for (const catId in grades) {
      cleanedGrades[catId] = grades[catId].filter(mark => mark !== '' && mark !== null);
    }
    onSave(student.id, currentTrimester, cleanedGrades);
  };

  return (
    <>
      <BackgroundBlackBlur change={true} />
      <div className="add-grades-modal">
        <div className="add-grades-modal__content">
          <button className="add-grades-modal__close" onClick={onClose}>✖</button>
          <div className="add-grades-modal__categories">
            {categories.map((cat) => (
              <div key={cat.id} className="add-grades-modal__category-group">
                <h4 className="add-grades-modal__category-title">{cat.title}</h4>
                <div className="add-grades-modal__inputs">
                  {grades[cat.id]?.map((mark, idx) => (
                    <div key={idx} className="add-grades-modal__input-group">
                      <label>Nota {idx + 1}</label>
                      <div className="add-grades-modal__input-wrapper">
                        <input
                          type="text"
                          value={mark}
                          onChange={(e) => handleGradeChange(cat.id, idx, e.target.value)}
                        />
                        <button className="add-grades-modal__delete-note" onClick={() => handleDeleteGrade(cat.id, idx)}>✖</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="add-grades-modal__add-note-btn"
                  onClick={() => handleAddGradeInput(cat.id)}
                >
                  Agregar nota
                </button>
              </div>
            ))}
          </div>
          <button className="add-grades-modal__save-btn" onClick={handleSave}>
            Agregar notas
          </button>
        </div>
      </div>
    </>
  );
};
