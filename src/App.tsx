import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context/AuthContext";

function App() {
  const navigate = useNavigate();
  // const [error, setError] = useState<string | null>(null);
  const { token, login, logout } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/data");
    }
  }, [token]);

  return (
    <div>
      <div>
        {token ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <button onClick={() => login()}>Login with Google</button>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default App;
