import StudentPage from "./pages/StudentPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/StudentPage" element={<StudentPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/add" element={<AddBook />} />
      <Route path="*" element="Page Not Found!" />
    </Routes>
  );
}

export default App;
