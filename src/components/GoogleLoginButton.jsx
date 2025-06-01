import { useNavigate } from "react-router-dom";
import "../styles/GoogleLoginButton.scss";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import GoogleButton from "react-google-button";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 직접 Google OAuth 리디렉션 구현
  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
    const redirectUri = `${window.location.origin}/google-callback`;

    // Google OAuth 2.0 인증 URL 생성
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const scope = "email profile openid";

    // 전체 인증 URL 생성
    const fullUrl = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;

    // console.log("Google Auth URL:", fullUrl);

    // 인증 페이지로 리디렉션
    window.location.href = fullUrl;
  };

  return (
    <div className="google-btn-wrapper">
      <GoogleButton
        label={t("login.google")}
        type="light"
        onClick={handleGoogleLogin}
        style={{ width: "100% !important", borderRadius: "9px !important" }}
      />
    </div>
  );
};

export default GoogleLoginButton;
