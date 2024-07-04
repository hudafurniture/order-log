import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "../src/@/components/theme-provider";
import { Navbar } from "../src/components/Nav/Nav";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {!isLoginPage && <Navbar />}
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
