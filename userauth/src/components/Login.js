import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import Login from "./Login"; // Assuming you separate the login part into a new component
import ListOfTodo from "./components/ListOfTodo";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<ListOfTodo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
