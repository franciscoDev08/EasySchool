import "./Courses.scss";
import { Link } from "react-router-dom";
import { AddCourse } from "./components/AddCourse.jsx";
import { CourseCard } from "./components/CourseCard.jsx";

export const Courses = () => {
  return (
    <>
      <main className="courses">
        {/* <AddCourse /> */}

        <header className="courses__header">
          <h2 className="courses__title">Cursos</h2>
          <button className="courses__btn-add-course">Agregar curso</button>
        </header>
        <section className="courses__container">
          {/* Para crear cards de cursos */}
          <CourseCard />
        </section>

        <svg
          className="courses__wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#111"
            fillOpacity="1"
            d="M0,320L48,288C96,256,192,192,288,181.3C384,171,480,213,576,208C672,203,768,149,864,144C960,139,1056,181,1152,208C1248,235,1344,245,1392,250.7L1440,256L1440,320Z"
          />
        </svg>
      </main>
    </>
  );
};
