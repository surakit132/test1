import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/authentication.jsx";
import { BrowserRouter } from "react-router-dom";
import jwtInterceptor from "./utils/jwtinterceptor.mjs";
import { SocketProvider } from "./contexts/socket.jsx";

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);
