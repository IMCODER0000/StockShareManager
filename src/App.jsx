import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommonRoutes from "./CommonRoutes";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/*" element={<CommonRoutes />} />
        



      </Routes>
    </Router>
  );
}

export default App;
