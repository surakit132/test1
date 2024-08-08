import "./App.css";
import React from "react";
import AutenticationApp from "./pages/AutenticationApp";
import UnautenticationApp from "./pages/UnauthenticationApp";
import { useAuth } from "./contexts/authentication";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AutenticationApp /> : <UnautenticationApp />; 
}

export default App;
