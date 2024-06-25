import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import SheetData from "./pages/SheetData";
import NotFound from "./pages/NotFound";

const RouterConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="data" element={<SheetData />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default RouterConfig;
