import { useState } from "react";
import "./AddCourse.scss";
import { BackgroundBlackBlur } from "../../../components/common/BackgroundBlackBlur.jsx";
import { useSchool } from "../../../context/SchoolContext.jsx";

export const AddCourse = ({ onClose }) => {
  const [year, setYear] = useState("");
  const [division, setDivision] = useState("");
  const [subject, setSubject] = useState("");
  const { addCourse } = useSchool();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!year || !division || !subject) return;

    addCourse({ year, division, subject });
    onClose();
  };

  return (
    <>
      <div className="layout__add-course">
        <article className="add-course">
          <button className="add-course__close" onClick={onClose}>
            <i className="bx bx-x"></i>
          </button>
          <span className="add-course__icon">
            <i className="bx bxs-graduation"></i>
          </span>

          <form className="add-course__form" onSubmit={handleSubmit}>
            <label htmlFor="inp-year" className="add-course__label">
              Año
            </label>
            <input
              id="inp-year"
              className="add-course__inp"
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <label htmlFor="inp-division" className="add-course__label">
              División
            </label>
            <input
              id="inp-division"
              className="add-course__inp"
              type="text"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            />

            <label htmlFor="inp-subject" className="add-course__label">
              Materia
            </label>
            <input
              id="inp-subject"
              className="add-course__inp"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="submit"
              className="add-course__inp-submit"
              value="Agregar curso"
            />
          </form>
        </article>
        <BackgroundBlackBlur onClick={onClose} />
      </div>
    </>
  );
};
