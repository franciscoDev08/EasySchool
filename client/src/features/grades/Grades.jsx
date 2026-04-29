import { useState } from "react";
import "./Grades.scss";

export const Grades = () => {
  const [student, setStudent] = useState({
    id: 1,
    name: "Abrego Francisco",
    grades: [
      { category: "Conducta", mark: 10 },
      { category: "Trabajo práctico", mark: 10 },
      { category: "Evaluaciones", mark: 10 },
      { category: "PPI", mark: 10 },
    ],
  });

  return (
    <>
      <main className="grades">
        <h2>Calificaciones</h2>

        <article className="grades__panel">
          {/* Todo esto tiene que ser dinamico */}
          <header className="grades__panel-header">
            <p>N°</p>
            <p>Estudiante</p>
            <div className="grades__marks">
              <p>Calificaciones</p>
              <ul className="grades__category">
                {student.grades.map((item) => (
                  <li key={item.id}>
                    {item.category}
                    {/* <button onClick={() => removeCategory(i)}>❌</button> */}
                  </li>
                ))}
              </ul>
            </div>
            <p>Promedio</p>
            <p>Actions</p>
          </header>

          <div className="grades__student">
            <p>1</p>
            <h4>Abrego Francisco</h4>
            <div>
              <ul className="grades__category-marks">
                {student.grades.map((item) => (
                  <li key={item.id}>
                    {item.mark}
                    {/* <button onClick={() => removeCategory(i)}>❌</button> */}
                  </li>
                ))}
              </ul>
            </div>
            <p>8</p>
            <button>Notas</button>
          </div>
        </article>
      </main>
    </>
  );
};
