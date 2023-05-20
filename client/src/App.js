import React from "react";
import Input from "./Input.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Input />}/>
      </Routes>
    </Router>
  );
}

export default App;
