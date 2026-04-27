import "./AddCourse.scss";
import { BackgroundBlackBlur } from "../../../components/common/BackgroundBlackBlur.jsx";

export const AddCourse = () => {
  return (
    <>
      <div className="layout__add-course">
        <article className="add-course">
          <button className="add-course__close">
            <i className="bx bx-x"></i>
          </button>
          <span className="add-course__icon">
            <i className="bx bxs-graduation"></i>
          </span>

          <form className="add-course__form">
            <label htmlFor="inp-year" className="add-course__label">
              Año
            </label>
            <input id="inp-year" className="add-course__inp" type="text" />
            <label htmlFor="inp-division" className="add-course__label">
              División
            </label>
            <input id="inp-division" className="add-course__inp" type="text" />

            <label htmlFor="inp-subject" className="add-course__label">
              Materia
            </label>
            <input id="inp-subject" className="add-course__inp" type="text" />

            <input
              type="button"
              className="add-course__inp-submit"
              value="Agregar curso"
            />
          </form>
        </article>
        <BackgroundBlackBlur />
      </div>
    </>
  );
};
