import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GoogleLoginButton from "../components/GoogleLoginButton";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();
  // const checkGoogle = () => {
  //   console.log("구글 로그인상태 확인");
  //   console.log(localStorage.getItem("loginType"));
  //   console.log(localStorage.getItem("token"));
  // };

  const handleGeneralLogin = () => {
    console.log("일반 로그인 진행");
    console.log("email:", email);
    console.log("password:", password);
    const url = process.env.REACT_APP_WAS_URL;
    axios
      .post(`${url}/api/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("로그인 성공:", response.data);
        localStorage.setItem("loginType", "normal");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        window.dispatchEvent(new Event("authChange"));
        handleLogin();
        navigate("/");
      })
      .catch((error) => {
        console.error("로그인 실패:", error);
      });
  };

  return (
    <div className="login-container">
      <h1>{t("login.title")}</h1>
      <p>{t("login.subtitle")}</p>
      <div className="login-box">
        <input
          type="email"
          placeholder={t("login.email")}
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={t("login.password")}
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={handleGeneralLogin}>
          {t("login.login")}
        </button>

        <div className="login-divider">{t("login.or")}</div>

        <GoogleLoginButton />

        <div className="bottom-links">
          <a href="/signup">{t("login.signup")}</a>
        </div>
        {/* <button className="checkgoogle" onClick={checkGoogle}>
          구글?
        </button> */}
      </div>
    </div>
  );
};

export default Login;
