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
              title
            </h1>
            <h2 className="home__sub-title">Elige tu usuario</h2>
          </header>

          <div className="home__roles">
            <Link className="home__btn-roles" to="personal">
              Personal de <br /> la institución
            </Link>
            <Link className="home__btn-roles" to="parent">
              Padre
            </Link>
          </div>

          {/* <Auth
            features={{
              type: "login",
              role: "parent",
            }}
          /> */}
        </div>
      </main>
    </>
  );
};
