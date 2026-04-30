import { useState } from "react";
import "./Attendance.scss";
import { useSchool } from "../../context/SchoolContext.jsx";
import backgroundImage from "../../assets/images/background-orange-good.png";

export const Attendance = () => {
  const {
    activeCourseStudents: students,
    updateStudentAttendance,
    activeCourse,
    addStudent,
    deleteStudent,
    activeCourseId,
  } = useSchool();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("Marzo");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudentName, setNewStudentName] = useState("");

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const days = ["L", "M", "Mi", "J", "V"];

  const nextWeek = () => {
    setCurrentWeek((prev) => (prev < 4 ? prev + 1 : 1));
  };

  const prevWeek = () => {
    setCurrentWeek((prev) => (prev > 1 ? prev - 1 : 4));
  };

  const handleAttendanceChange = (studentId, day, status) => {
    updateStudentAttendance(studentId, selectedMonth, currentWeek, day, status);
  };

  const handleDownloadCSV = () => {
    let csvRows = ["Estudiante;Semana 1;Semana 2;Semana 3;Semana 4"];

    students.forEach((student) => {
      const row = [`"${student.name}"`];
      const monthData = student.attendanceByMonth?.[selectedMonth] || {};
      for (let w = 1; w <= 4; w++) {
        const weekAtt = monthData[w] || { L: "empty", M: "empty", Mi: "empty", J: "empty", V: "empty" };
        const statusStr = days.map((d) => `${d}:${weekAtt[d]}`).join(" ");
        row.push(`"${statusStr}"`);
      }
      csvRows.push(row.join(";"));
    });

    const csvString = csvRows.join("\r\n");
    const blob = new Blob(["\uFEFF" + csvString], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "asistencia.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateStats = (student) => {
    let absences = 0;
    let tardies = 0;

    const monthData = student.attendanceByMonth?.[selectedMonth] || {};

    for (let w = 1; w <= 4; w++) {
      const weekAtt = monthData[w] || {};
      for (const day of days) {
        if (weekAtt[day] === "absent") absences += 1;
        if (weekAtt[day] === "late") tardies += 1;
      }
    }
    return { absences, tardies };
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!activeCourseId) {
      alert("Por favor, selecciona un curso antes de agregar estudiantes.");
      return;
    }
    if (!newStudentName.trim()) return;

    addStudent(activeCourseId, newStudentName.trim());
    setNewStudentName("");
  };

  const handleDeleteStudent = (studentId) => {
    deleteStudent(studentId);
  };

  return (
    <>
      <main className="attendance">
        <header className="attendance__header">
          <div className="attendance__header-titles">
            <h2 className="attendance__title">Asistencia</h2>
            <div className="attendance__month-selector">
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="attendance__month-select"
              >
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          {activeCourse && (
            <div className="attendance__active-course-badge">
              Estás en {activeCourse.year} {activeCourse.division} -{" "}
              {activeCourse.subject}
            </div>
          )}
          <button className="attendance__csv-btn" onClick={handleDownloadCSV}>
            Descargar CSV
          </button>
        </header>

        <article className="attendance__panel">
          <header className="attendance__panel-header">
            <p className="attendance__col-id">N°</p>
            <p className="attendance__col-name">Estudiante</p>
            <div className="attendance__week">
              <h4>Semana {currentWeek}</h4>
              <div className="attendance__btn-arrow">
                <button
                  className="attendance__btn-arrow-left"
                  onClick={prevWeek}
                >
                  <i className="bx bx-chevron-left"></i>
                </button>
                <button
                  className="attendance__btn-arrow-right"
                  onClick={nextWeek}
                >
                  <i className="bx bx-chevron-right"></i>
                </button>
              </div>
            </div>
            <p className="attendance__col-actions">Actions</p>
          </header>

          <div className="attendance__student-list">
            {students.length === 0 && (
              <div className="attendance__empty-state">
                <p>No hay estudiantes en este curso.</p>
              </div>
            )}
            {students.map((student, index) => (
              <div key={student.id} className="attendance__student">
                <p className="attendance__col-id">{index + 1}</p>
                <h3 className="attendance__col-name">{student.name}</h3>
                <div className="attendance__assis">
                  {days.map((day) => (
                    <div key={day} className="attendance__day">
                      <label htmlFor={`day-${student.id}-${day}`}>{day}</label>
                      <select
                        id={`day-${student.id}-${day}`}
                        className="attendance__select"
                        value={
                          student.attendanceByMonth?.[selectedMonth]?.[currentWeek]?.[day] ||
                          "empty"
                        }
                        onChange={(e) =>
                          handleAttendanceChange(
                            student.id,
                            day,
                            e.target.value,
                          )
                        }
                      >
                        <option value="empty">--</option>
                        <option value="present">✅</option>
                        <option value="absent">❌</option>
                        <option value="late">⚠️</option>
                        <option value="justified">🟡</option>
                      </select>
                    </div>
                  ))}
                </div>
                <div className="attendance__col-actions">
                  <button
                    className="attendance__more-info-btn"
                    onClick={() => setSelectedStudent(student)}
                  >
                    Más info
                  </button>
                  <button
                    className="attendance__delete-student-btn"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <form
          className="attendance__add-student-form"
          onSubmit={handleAddStudent}
        >
          <input
            type="text"
            placeholder="Nombre del estudiante..."
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            className="attendance__add-student-input"
          />
          <button type="submit" className="attendance__add-student-submit">
            +
          </button>
        </form>

        {selectedStudent && (
          <div
            className="attendance__modal-overlay"
            onClick={() => setSelectedStudent(null)}
          >
            <div
              className="attendance__modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="attendance__modal-close"
                onClick={() => setSelectedStudent(null)}
              >
                <i className="bx bx-x"></i>
              </button>
              <div className="attendance__modal-body">
                <h3 className="attendance__modal-name">
                  {selectedStudent.name}
                </h3>
                <p className="attendance__modal-course">
                  {activeCourse?.year} {activeCourse?.division}
                </p>

                <div className="attendance__modal-stats">
                  <div className="attendance__modal-stat">
                    <span>
                      Inasistencias: {calculateStats(selectedStudent).absences}
                    </span>
                  </div>
                  <div className="attendance__modal-stat">
                    <span>
                      Tardanzas: {calculateStats(selectedStudent).tardies}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
