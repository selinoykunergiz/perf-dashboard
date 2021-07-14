import React from "react";
import "./App.scss";
import Dashboard from "./pages/Dashboard/dashboard";
import { useRoutes, useRedirect } from "hookrouter";

const routes = {
  '/dashboard': () => <Dashboard />
}

function App() {
  const match = useRoutes(routes);
  useRedirect('/','/dashboard');
  return (
    <div>
      {match}
    </div>
  );
}

export default App;
