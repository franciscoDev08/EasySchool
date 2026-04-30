import "./Home.scss";
import { BackgroundBlackBlur } from "../../components/common/BackgroundBlackBlur";
import { Link } from "react-router-dom";
import { Auth } from "../auth/Auth";
import { DashboardPreceptor } from "../preceptor/DashboardPreceptor";

export const Home = () => {
  return (
    <>
      <main className="home">
        <div className="home__container">
          <header className="home__header">
            <h1 className="home__title">
              Bienvenido a <br />
              EasySchool
            </h1>
          </header>

          <div className="home__roles">
            <Link className="home__btn-web" to="/courses">
              Ir a la aplicación
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
