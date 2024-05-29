import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";

import Login from "./pages/Login.jsx";
import { useAuth } from "./hooks/useAuth.jsx";

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={user ? <Index /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
    
  );
}

export default App;
