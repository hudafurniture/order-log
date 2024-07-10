import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./RouterConfig.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { DirectionProvider } from "@radix-ui/react-direction";
import { FilterProvider } from "./context/FilterContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID as string}>
      <AuthProvider>
        <FilterProvider>
          <DirectionProvider dir="rtl">
            <BrowserRouter>
              <RouterConfig />
            </BrowserRouter>
          </DirectionProvider>
        </FilterProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
