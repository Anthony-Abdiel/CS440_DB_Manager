import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employees" element={<EmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App
