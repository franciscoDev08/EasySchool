import "./Attendance.scss";

export const Attendance = () => {
  return (
    <>
      <main className="attendance">
        <header className="attendance__header">
          <h2 className="attendance__title">Asistencia</h2>
          <p className="attendance__month">Marzo</p>
        </header>

        <article className="attendance__panel">
          <header className="attendance__panel-header">
            <p>N°</p>
            <p>Estudiante</p>
            <div className="attendance__week">
              <h4>Semana 1</h4>
              <button className="attendance__btn-arrow-right">
                <i class="bx bx-chevron-right"></i>
              </button>
            </div>
            <p>Actions</p>
          </header>
          <div className="attendance__student">
            <p>1</p>
            <h3>Francisco</h3>
            <div className="attendance__assis">
              {["L", "M", "Mi", "J", "V"].map((day) => (
                <div key={day} className="attendance__day">
                  <label htmlFor={`day-${day}`}>{day}</label>
                  <select
                    name=""
                    id={`day-${day}`}
                    className="attendance__select"
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
            <button>Más info</button>
          </div>
        </article>
      </main>
    </>
  );
};
