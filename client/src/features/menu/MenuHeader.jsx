import "./MenuStyles.scss";

export const MenuHeader = ({ isOpen, onToggle }) => {
  return (
    <>
      <header className="header">
        <button className="header__toggle" onClick={onToggle}>
          <i className={isOpen ? "bx bx-menu-alt-right" : "bx bx-menu"}></i>
        </button>
        <div className="header__brand">
          <h1>EasySchool</h1>
        </div>
      </header>
    </>
  );
};
