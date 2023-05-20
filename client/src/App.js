import React from "react";
import Input from "./Input.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<DashBoard />}/>
        <Route path="/Input" element={<Input />}/>
      </Routes>
    </Router>
  );
}

export default App;

{/**/}
