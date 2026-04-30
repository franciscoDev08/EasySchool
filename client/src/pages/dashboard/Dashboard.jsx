import { useState } from "react";
import "./Dashboard.scss";
import { MenuHeader } from "../../features/menu/MenuHeader.jsx";
import { Sidebar } from "../../features/menu/Sidebar.jsx";
import { Courses } from "../../features/courses/Courses.jsx";
import { Attendance } from "../../features/attendance/Attendance.jsx";
import { Grades } from "../../features/grades/Grades.jsx";

export const Dashboard = ({ type }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <MenuHeader 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <div className="layout">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        {type === "courses" && <Courses />}
        {type === "attendance" && <Attendance />}
        {type === "grades" && <Grades />}
      </div>
    </>
  );
};
