import "./Dashboard.scss";
import { MenuHeader } from "../../features/menu/MenuHeader.jsx";
import { Sidebar } from "../../features/menu/Sidebar.jsx";
import { Courses } from "../../features/courses/Courses.jsx";

export const Dashboard = () => {
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
