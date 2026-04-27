import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Dashboard } from "./pages/dashboard/Dashboard";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preceptor/courses" element={<Dashboard />} />
      <Route path="/teacher/courses" element={<Dashboard />} />
    </Routes>
  );
};
