import StudentPage from "./pages/StudentPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AddBook from "./pages/AddBook";
import AdminRoute from "./pages/AdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/StudentPage" element={<StudentPage />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      <Route
        path="/add"
        element={
          <AdminRoute>
            <AddBook />
          </AdminRoute>
        }
      />
      <Route path="*" element="Page Not Found!" />
    </Routes>
  );
}

export default App;
