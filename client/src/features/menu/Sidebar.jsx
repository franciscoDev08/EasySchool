import "./MenuStyles.scss";
import { NavLink } from "react-router-dom";

import { useState } from "react";

export const Sidebar = ({ isOpen, onToggle }) => {

  return (
    <>
      <aside
        className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}
      >
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
              <i class="bx bx-building-house"></i>{" "}
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
              <i class="bx bx-book"></i>{" "}
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
              <i class="bx bxs-star"></i>{" "}
            </span>
            Calificaciones
          </NavLink>
        </nav>
      </aside>
      {isOpen && (
        <div className="sidebar__overlay" onClick={onToggle}></div>
      )}
    </>
  );
};
