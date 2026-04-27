import "./MenuStyles.scss";
import logo from "../../assets/images/4k-minimalist-wallpaper-1.jpg";

export const MenuHeader = () => {
  return (
    <>
      <header className="header">
        <button className="header__btn-menu">
          <i className="bx bx-menu"></i>
        </button>

        <img src={logo} className="header__logo" alt="" />
      </header>
    </>
  );
};
