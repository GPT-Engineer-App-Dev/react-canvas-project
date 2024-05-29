import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";

import { useAuth } from "./integrations/supabase/index.js";

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Index /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
