import { useState } from "react";
import { AuthLogin } from "./AuthLogin";
import { AuthRegister } from "./AuthRegister";

export const Auth = ({ features }) => {
  const [authForm, setAuthForm] = useState(features);
  return (
    <>
      {authForm.type === "login" ? (
        <AuthLogin
          roleLogin={authForm.role === "staff" ? "staff" : "parent"}
          setAuth={setAuthForm}
        />
      ) : (
        <AuthRegister setAuth={setAuthForm} />
      )}
    </>
  );
};
