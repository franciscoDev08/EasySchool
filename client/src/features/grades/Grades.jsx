import { useState, useEffect } from "react";
import { AddCategoryModal } from "./components/AddCategoryModal/AddCategoryModal";
import { AddGradesModal } from "./components/AddGradesModal/AddGradesModal";
import "./Grades.scss";
import { useSchool } from "../../context/SchoolContext.jsx";

export const Grades = () => {
  const { activeCourse, activeCourseStudents: students, addStudent, deleteStudent, updateStudentGrades, activeCourseId } = useSchool();

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("grades_categories");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "c1", title: "Conducta" },
          { id: "c2", title: "Título 2" },
          { id: "c3", title: "Título 3" },
        ];
  });

  const [newStudentName, setNewStudentName] = useState("");

  useEffect(() => {
    localStorage.setItem("grades_categories", JSON.stringify(categories));
  }, [categories]);

  const [currentTrimester, setCurrentTrimester] = useState(1);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isGradesModalOpen, setIsGradesModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const handleDownloadCSV = () => {
    const headers = [
      "ID",
      "Estudiante",
      "Cuatrimestre",
      ...categories.map((c) => c.title),
    ];
    let csvRows = [headers.join(";")]; // Use semicolon for Excel compatibility

    students.forEach((student) => {
      [1, 2].forEach((trim) => {
        let row = [student.id, `"${student.name}"`, trim];
        categories.forEach((cat) => {
          const marks = student.gradesByTrimester[trim]?.[cat.id] || [];
          row.push(`"${marks.join(" - ")}"`);
        });
        csvRows.push(row.join(";"));
      });
    });

    const csvString = csvRows.join("\r\n");
    const blob = new Blob(["\uFEFF" + csvString], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "calificaciones.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveCategories = (newCategories) => {
    setCategories(newCategories);
    setIsCategoryModalOpen(false);
    // Note: removing grades for deleted categories might need a Context function if desired.
  };

  const handleDeleteStudent = (studentId) => {
    deleteStudent(studentId);
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !activeCourseId) return;

    addStudent(activeCourseId, newStudentName.trim());
    setNewStudentName("");
  };

  const handleDeleteNoteFromPanel = (
    studentId,
    trimester,
    catId,
    markIndex,
  ) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      const catMarks = [
        ...(student.gradesByTrimester[trimester]?.[catId] || []),
      ];
      catMarks.splice(markIndex, 1);
      
      const newGrades = {
        ...student.gradesByTrimester[trimester],
        [catId]: catMarks,
      };
      
      updateStudentGrades(studentId, trimester, newGrades);
    }
  };

  const handleSaveGrades = (studentId, trimester, newGrades) => {
    updateStudentGrades(studentId, trimester, newGrades);
    setIsGradesModalOpen(false);
  };

  const openGradesModal = (studentId) => {
    setSelectedStudentId(studentId);
    setIsGradesModalOpen(true);
  };

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  return (
    <main className="grades">
      <header className="grades__header">
        <h2>Calificaciones</h2>
        {activeCourse && (
          <div className="grades__active-course-badge">
            Estás en {activeCourse.year} {activeCourse.division} - {activeCourse.subject}
          </div>
        )}
      </header>

      <div className="grades__controls">
        <div className="grades__trimesters">
          <button
            className={`grades__trimester-btn ${currentTrimester === 1 ? "active" : ""}`}
            onClick={() => setCurrentTrimester(1)}
          >
            Cuatrimestre 1
          </button>
          <button
            className={`grades__trimester-btn ${currentTrimester === 2 ? "active" : ""}`}
            onClick={() => setCurrentTrimester(2)}
          >
            Cuatrimestre 2
          </button>
        </div>

        <div className="grades__actions">
          <button className="grades__csv-btn" onClick={handleDownloadCSV}>
            Descargar CSV
          </button>
          <button
            className="grades__add-category-btn"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            Agregar categorías
          </button>
        </div>
      </div>

      <article className="grades__panel">
        <header className="grades__panel-header">
          <p className="grades__col-id">N°</p>
          <p className="grades__col-name">Estudiante</p>
          <div className="grades__marks">
            <button
              className="grades__mobile-nav prev"
              onClick={() =>
                setActiveCategoryIndex((prev) => Math.max(0, prev - 1))
              }
            >
              &lt;
            </button>
            <ul className="grades__category">
              {categories.map((item, index) => (
                <li
                  key={item.id}
                  className={`grades__cat-item ${index === activeCategoryIndex ? "active-mobile" : ""}`}
                >
                  {item.title}
                </li>
              ))}
            </ul>
            <button
              className="grades__mobile-nav next"
              onClick={() =>
                setActiveCategoryIndex((prev) =>
                  Math.min(categories.length - 1, prev + 1),
                )
              }
            >
              &gt;
            </button>
          </div>
          <p className="grades__col-actions">Actions</p>
        </header>

        <div className="grades__student-list">
          {students.length === 0 && (
            <div className="grades__empty-state">
              <p>No tienes estudiantes, agrégalos.</p>
            </div>
          )}
          {students.map((student, index) => (
            <div key={student.id} className="grades__student">
              <p className="grades__col-id">{index + 1}</p>
              <h4 className="grades__col-name">{student.name}</h4>
              <div className="grades__marks-data">
                <button className="grades__mobile-nav prev hidden">&lt;</button>
                <ul className="grades__category-marks">
                  {categories.map((cat, index) => {
                    const marks =
                      student.gradesByTrimester[currentTrimester]?.[cat.id] ||
                      [];
                    return (
                      <li
                        key={cat.id}
                        className={`grades__mark-item ${index === activeCategoryIndex ? "active-mobile" : ""}`}
                      >
                        {marks.length > 0 ? (
                          marks.map((mark, i) => (
                            <div key={i} className="grades__mark-pill-wrapper">
                              <span className="grades__mark-pill">{mark}</span>
                              <button
                                className="grades__delete-pill-btn"
                                onClick={() =>
                                  handleDeleteNoteFromPanel(
                                    student.id,
                                    currentTrimester,
                                    cat.id,
                                    i,
                                  )
                                }
                              >
                                ✖
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="grades__mark-pill empty">--</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <button className="grades__mobile-nav next hidden">&gt;</button>
              </div>
              <div className="grades__col-actions">
                <button
                  className="grades__action-btn"
                  onClick={() => openGradesModal(student.id)}
                >
                  Notas
                </button>
                <button
                  className="grades__delete-student-btn"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      </article>

      <form className="grades__add-student-form" onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Nombre del estudiante..."
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          className="grades__add-student-input"
        />
        <button type="submit" className="grades__add-student-submit">
          +
        </button>
      </form>

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        initialCategories={categories}
        onSave={handleSaveCategories}
      />

      <AddGradesModal
        isOpen={isGradesModalOpen}
        onClose={() => setIsGradesModalOpen(false)}
        student={selectedStudent}
        categories={categories}
        currentTrimester={currentTrimester}
        onSave={handleSaveGrades}
      />
    </main>
  );
};
