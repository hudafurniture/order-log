import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import SheetData from "./pages/sheets-data/SheetData";
import NotFound from "./pages/NotFound";
import Login from "./pages/login/Login";
import Stats from "./pages/Stats";
import History from "./pages/History";

const RouterConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />} />
        <Route path="data" element={<SheetData />} />
        <Route path="history" element={<History />} />
        <Route path="stats" element={<Stats />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default RouterConfig;
