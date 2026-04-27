import "./AuthStyles.scss";
import imgRegister from "../../assets/images/pyramids-minimalist-4k_1560535308.jpg";
import { BackgroundBlackBlur } from "../../components/common/BackgroundBlackBlur.jsx";

export const AuthRegister = ({ setAuth }) => {
  return (
    <>
      <section className="auth">
        <div className="auth__container">
          <button className="auth__btn-close">
            <i className="bx bx-x"></i>
          </button>

          <img className="auth__img" src={imgRegister} />

          <div className="auth__content">
            <h2 className="auth__title">Registrarse</h2>

            <form className="auth__form">
              <label htmlFor="inp-dni" className="auth__label">
                DNI
              </label>
              <input id="inp-dni" className="auth__inp" type="text" />

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
              <h4>¿Ya tienes cuenta?</h4>
              <button
                className="auth__btn-footer"
                onClick={() => setAuth((prev) => ({ ...prev, type: "login" }))}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>

        <BackgroundBlackBlur change="background" />
      </section>
    </>
  );
};
