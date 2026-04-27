import "./BackgroundBlackBlur.scss";

export const BackgroundBlackBlur = ({ change }) => {
  return <div className={change ? "background" : "background-height"}></div>;
};
