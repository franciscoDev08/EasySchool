import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Attendance } from "./features/attendance/Attendance";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preceptor">
        <Route path="courses" element={<Dashboard type="courses" />} />
        <Route path="attendance" element={<Dashboard type="attendance" />} />
      </Route>
      <Route path="/teacher">
        <Route path="courses" element={<Dashboard type="courses" />} />
        <Route path="attendance" element={<Dashboard type="attendance" />} />
        <Route path="grades" element={<Dashboard type="grades" />} />
      </Route>
    </Routes>
  );
};
