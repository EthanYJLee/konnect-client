import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  useEffect(() => {
    // URL의 해시 파라미터에서 토큰 추출
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      // 액세스 토큰으로 사용자 정보 가져오기
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((userInfo) => {
          // console.log("Google User Info:", userInfo);

          // 서버에 인증 정보 전송
          fetch(`${process.env.REACT_APP_WAS_URL}/api/auth/google/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "access_token",
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              id: userInfo.id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("loginType", "google");
                localStorage.setItem("email", userInfo.email);
                localStorage.setItem("userPicture", userInfo.picture);

                // AuthContext의 handleLogin 함수에 사용자 정보 전달
                handleLogin({
                  email: userInfo.email,
                  name: userInfo.name,
                  picture: userInfo.picture,
                });

                navigate("/");
              } else {
                // console.error("No token received from server:", data);
                navigate("/login", {
                  state: { error: "로그인에 실패했습니다. 다시 시도해주세요." },
                });
              }
            })
            .catch((err) => {
              // console.error("Error during server authentication:", err);
              navigate("/login", {
                state: { error: "서버 인증 중 오류가 발생했습니다." },
              });
            });
        })
        .catch((err) => {
          // console.error("Error fetching user info:", err);
          navigate("/login", {
            state: {
              error: "구글 사용자 정보를 가져오는 중 오류가 발생했습니다.",
            },
          });
        });
    } else {
      navigate("/login", {
        state: { error: "액세스 토큰을 받지 못했습니다." },
      });
    }
  }, [navigate, handleLogin]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">로딩 중...</span>
        </div>
        <p className="mt-3">구글 로그인 처리 중입니다...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
