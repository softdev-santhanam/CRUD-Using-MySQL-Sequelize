import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Add from "./Component/Add";
import Update from "./Component/Update";

function App() {
  return (
    <div className="main">
      <div className="text-bg-info p-3">
        <h1 className="text-center ">Release Notes</h1>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
