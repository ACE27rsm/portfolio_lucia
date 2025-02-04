import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

/// * routes
import Portfolio from "./portfolio/Portfolio";
import Skills from "./skills/Skills";
import Contatti from "./contatti/Contatti";
import Home from "./home/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/cosafaccio" element={<Portfolio />} />
      <Route path="/competenze" element={<Skills />} />
      <Route path="/contatti" element={<Contatti />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
