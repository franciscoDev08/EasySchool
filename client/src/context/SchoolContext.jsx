import { createContext, useContext, useState, useEffect } from "react";

const SchoolContext = createContext();

export const useSchool = () => useContext(SchoolContext);

export const SchoolProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("school_courses");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCourseId, setActiveCourseId] = useState(() => {
    return localStorage.getItem("school_activeCourseId") || null;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("school_students");
    if (saved) {
      return JSON.parse(saved);
    }
    // Migration from old grades_students if needed, or empty array
    const oldGrades = localStorage.getItem("grades_students");
    return oldGrades ? JSON.parse(oldGrades) : [];
  });

  useEffect(() => {
    localStorage.setItem("school_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    if (activeCourseId) {
      localStorage.setItem("school_activeCourseId", activeCourseId);
    } else {
      localStorage.removeItem("school_activeCourseId");
    }
  }, [activeCourseId]);

  useEffect(() => {
    localStorage.setItem("school_students", JSON.stringify(students));
  }, [students]);

  const addCourse = (course) => {
    const newCourse = { ...course, id: Date.now().toString() };
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
    if (activeCourseId === id) setActiveCourseId(null);
  };

  const editCourse = (id, updatedCourse) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, ...updatedCourse } : c)));
  };

  const addStudent = (courseId, name) => {
    const defaultWeeks = {
      1: { L: "empty", M: "empty", Mi: "empty", J: "empty", V: "empty" },
      2: { L: "empty", M: "empty", Mi: "empty", J: "empty", V: "empty" },
      3: { L: "empty", M: "empty", Mi: "empty", J: "empty", V: "empty" },
      4: { L: "empty", M: "empty", Mi: "empty", J: "empty", V: "empty" },
    };

    const newStudent = {
      id: Date.now().toString(),
      courseId,
      name,
      gradesByTrimester: { 1: {}, 2: {} },
      attendanceByMonth: {
        "Marzo": { ...defaultWeeks },
        "Abril": { ...defaultWeeks },
        "Mayo": { ...defaultWeeks },
        "Junio": { ...defaultWeeks },
        "Julio": { ...defaultWeeks },
        "Agosto": { ...defaultWeeks },
        "Septiembre": { ...defaultWeeks },
        "Octubre": { ...defaultWeeks },
        "Noviembre": { ...defaultWeeks },
        "Diciembre": { ...defaultWeeks },
      },
    };
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const updateStudentGrades = (studentId, trimester, newGrades) => {
    setStudents(
      students.map((s) =>
        s.id === studentId
          ? {
              ...s,
              gradesByTrimester: {
                ...s.gradesByTrimester,
                [trimester]: newGrades,
              },
            }
          : s
      )
    );
  };

  const updateStudentAttendance = (studentId, month, week, day, status) => {
    setStudents(
      students.map((s) => {
        if (s.id !== studentId) return s;

        // Ensure attendanceByMonth exists (migration)
        const attendance = s.attendanceByMonth || { [month]: s.attendanceByWeek || {} };
        const monthData = attendance[month] || {
          1: { L: "empty", M: "empty", Mi: "empty", J: "empty", V: "empty" },
          2: { L: "empty", M: "empty", Mi: "empty", J: "empty", V: "empty" },
          3: { L: "empty", M: "empty", Mi: "empty", J: "empty", V: "empty" },
          4: { L: "empty", M: "empty", Mi: "empty", J: "empty", V: "empty" },
        };

        return {
          ...s,
          attendanceByMonth: {
            ...attendance,
            [month]: {
              ...monthData,
              [week]: {
                ...monthData[week],
                [day]: status,
              },
            },
          },
        };
      })
    );
  };

  const activeCourse = courses.find(c => c.id === activeCourseId) || null;
  const activeCourseStudents = students.filter(s => s.courseId === activeCourseId);

  return (
    <SchoolContext.Provider
      value={{
        courses,
        addCourse,
        deleteCourse,
        editCourse,
        activeCourseId,
        setActiveCourseId,
        activeCourse,
        students,
        setStudents,
        addStudent,
        deleteStudent,
        updateStudentGrades,
        updateStudentAttendance,
        activeCourseStudents,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
