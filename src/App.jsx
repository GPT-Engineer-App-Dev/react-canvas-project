import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import { useAuth } from "./integrations/supabase/index.js";

function App() {
  const user = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Index /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={<Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;