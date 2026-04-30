import "./CourseCard.scss";
import { useNavigate } from "react-router-dom";
import { useSchool } from "../../../context/SchoolContext.jsx";

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { setActiveCourseId, deleteCourse, students } = useSchool();

  const handleCardClick = () => {
    setActiveCourseId(course.id);
    navigate("../attendance");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteCourse(course.id);
  };

  const courseStudents = students.filter((s) => s.courseId === course.id);

  return (
    <>
      <article className="courses__card" onClick={handleCardClick}>
        <h3 className="courses__title-card">
          {course.year} {course.division}
        </h3>
        <p className="courses__subject">{course.subject}</p>
        <p className="courses__students-count">
          {courseStudents.length}{" "}
          {courseStudents.length === 1 ? "Estudiante" : "Estudiantes"}
        </p>

        <div className="courses__actions">
          <button
            className="courses__btn-action courses__btn-action--trash"
            onClick={handleDelete}
          >
            <i className="bx bx-trash-alt"></i>
          </button>
        </div>
      </article>
    </>
  );
};
