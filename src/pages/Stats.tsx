import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Stats = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <div dir="rtl" className="p-2 px-4">
      <h1>בקרוב..</h1>
    </div>
  );
};

export default Stats;
