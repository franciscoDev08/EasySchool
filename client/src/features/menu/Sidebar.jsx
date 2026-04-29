import "./MenuStyles.scss";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <>
      <aside className="sidebar">
        <nav className="sidebar__nav">
          <NavLink
            to="../../"
            className={({ isActive }) =>
              isActive
                ? "sidebar__btn-nav sidebar__btn-nav--active"
                : "sidebar__btn-nav "
            }
          >
            <span>
              <i className="bx bx-home-alt-2"></i>
            </span>
            Home
          </NavLink>
          <NavLink
            to="../courses"
            className={({ isActive }) =>
              isActive
                ? "sidebar__btn-nav sidebar__btn-nav--active"
                : "sidebar__btn-nav "
            }
          >
            <span>
              <i className="bx bx-home-alt-2"></i>
            </span>
            Cursos
          </NavLink>
          <NavLink
            to="../attendance"
            className={({ isActive }) =>
              isActive
                ? "sidebar__btn-nav sidebar__btn-nav--active"
                : "sidebar__btn-nav "
            }
          >
            <span>
              <i className="bx bx-home-alt-2"></i>
            </span>
            Asistencia
          </NavLink>
          <NavLink
            to="../grades"
            className={({ isActive }) =>
              isActive
                ? "sidebar__btn-nav sidebar__btn-nav--active"
                : "sidebar__btn-nav "
            }
          >
            <span>
              <i className="bx bx-home-alt-2"></i>
            </span>
            Calificaciones
          </NavLink>
        </nav>
      </aside>
    </>
  );
};
