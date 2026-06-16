import Catalogue from "./pages/Catalogue";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddBook from "./pages/AddBook";
function App() {
  return (
    <Routes>
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/add" element={<AddBook />} />
      <Route path="*" element="error 404" />
    </Routes>
  );
}

export default App;
