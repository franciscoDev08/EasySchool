import "./MenuStyles.scss";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <>
      <aside className="sidebar">
        <nav className="sidebar__nav">
          <Link to="../" className="sidebar__btn-nav sidebar__btn-nav--home">
            <span>
              <i className="bx bx-home-alt-2"></i>
            </span>
            Home
          </Link>
          <Link
            to="courses"
            className="sidebar__btn-nav sidebar__btn-nav--courses"
          >
            <span>
              <i className="bx bx-home-alt-2"></i>
            </span>
            Cursos
          </Link>
          <Link
            to="attendance"
            className="sidebar__btn-nav sidebar__btn-nav--home"
          >
            <span>
              <i className="bx bx-home-alt-2"></i>
            </span>
            Asistencia
          </Link>
          <Link
            to="subjects"
            className="sidebar__btn-nav sidebar__btn-nav--home"
          >
            <span>
              <i className="bx bx-home-alt-2"></i>
            </span>
            Calificaciones
          </Link>
        </nav>

        <button className="sidebar__btn-nav sidebar__btn-nav--account">
          <span>
            <i className="bx bx-user-circle"></i>
          </span>
          Usuario
        </button>
      </aside>
    </>
  );
};
