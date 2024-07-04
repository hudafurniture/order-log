import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

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
    <div>
      <div>
        <button onClick={() => login()}>Login with Google</button>
      </div>
    </div>
  );
};

export default Login;
