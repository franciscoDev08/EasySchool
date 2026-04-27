import "./CourseCard.scss";
import { useNavigate } from "react-router-dom";

export const CourseCard = () => {
  const navigate = useNavigate();

  return (
    <>
      <article
        className="courses__card"
        onClick={() => {
          navigate("attendance");
        }}
      >
        <h3 className="courses__title-card">5to A</h3>
        <p className="courses__subject">Lengua y Literatura</p>

        <div className="courses__actions">
          <button
            className="courses__btn-action courses__btn-action--edit"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="bx bx-pencil"></i>
          </button>
          <button
            className="courses__btn-action courses__btn-action--trash"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="bx bx-trash-alt"></i>
          </button>
        </div>
      </article>
    </>
  );
};
