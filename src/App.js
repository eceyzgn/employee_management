import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/addEmployee" element={<AddEmployee />} />
        <Route exact path="/updateEmployee/:id" element={<UpdateEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
