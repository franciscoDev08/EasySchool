import "./AuthStyles.scss";
import imgLogin from "../../assets/images/nature-moderm.jpg";
import { BackgroundBlackBlur } from "../../components/common/BackgroundBlackBlur.jsx";

export const AuthLogin = ({ roleLogin = "staff", setAuth }) => {
  return (
    <>
      <section className="auth">
        <div className="auth__container">
          <button className="auth__btn-close">
            <i className="bx bx-x"></i>
          </button>

          <img className="auth__img" src={imgLogin} />

          <div className="auth__content">
            <h2 className="auth__title">Iniciar sesion</h2>

            <form className="auth__form">
              {roleLogin === "staff" && (
                <div className="auth__container-select">
                  <label className="auth__label" htmlFor="staff-option">
                    Seleccionar rol:
                  </label>

                  <select className="auth__select" id="staff-option">
                    <option value="role-preceptor">Preceptor</option>
                    <option value="role-teacher">Profesor</option>
                  </select>
                </div>
              )}

              <label className="auth__label" htmlFor="inp-email">
                Correo electrónico
              </label>
              <input id="inp-email" className="auth__inp" type="text" />

              <label className="auth__label" htmlFor="inp-password">
                Contraseña
              </label>
              <input id="inp-password" className="auth__inp" type="text" />

              <input
                type="submit"
                className="auth__inp auth__inp--submit"
                value="Enviar"
              />
            </form>

            <div className="auth__footer">
              <h4>¿No tienes una cuenta?</h4>
              <button
                className="auth__btn-footer"
                onClick={() =>
                  setAuth((prev) => ({ ...prev, type: "register" }))
                }
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>

        <BackgroundBlackBlur change="background" />
      </section>
    </>
  );
};
