import "./DashboardTeacher.scss";
import { MenuHeader } from "../../features/menu/MenuHeader.jsx";
import { Sidebar } from "../../features/menu/Sidebar.jsx";
import { Courses } from "../../features/courses/Courses.jsx";

export const DashboardTeacher = () => {
  return (
    <>
      <MenuHeader />
      <div className="layout">
        <Sidebar />
        <Courses />
      </div>
    </>
  );
};
