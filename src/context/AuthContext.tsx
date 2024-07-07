import {
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

interface AuthContextProps {
  login: () => void;
  logout: () => void;
  token: string | null;
  setToken?: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  token: null,
  setToken: (): string | null => null,
});

const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const scope = "https://www.googleapis.com/auth/spreadsheets.readonly";

  // const TOKEN_EXP_TIME = 3600000; // 1 hour

  const login = useGoogleLogin({
    scope,
    onSuccess: (tokenResponse) => {
      setToken(tokenResponse.access_token);
      localStorage.setItem("oauth_token", tokenResponse.access_token);
      // localStorage.setItem("oauth_token_exp", JSON.stringify(Date.now()));
    },
    onError: () => {
      console.error("Failed to authenticate with Google");
    },
  });

  const logout = () => {
    googleLogout();
    setToken(null);
    localStorage.removeItem("oauth_token");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("oauth_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
