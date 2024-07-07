import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import bgWide from "../../assets/pictures/backgrounds/alhuda-1920-1080.png";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/data");
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="pageContainer">
      <div
        style={{
          backgroundImage: `url(${bgWide})`,
          width: "100%",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      >
        <div className="loginContainerWrapper">
          <div className="loginContainer">
            <h1 className="loginTitle">מערכת ניהול הזמנות פתוחות לפי מחסן</h1>
            <button onClick={() => login()} className="loginBtn">
              כניסה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
