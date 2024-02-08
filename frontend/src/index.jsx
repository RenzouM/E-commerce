import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Productoss from "./pages/Shop";
import Product from "./pages/Product";
import { AppProvider } from "./context/CartContext";
import { ApiProvider } from "./context/ProductsContext";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ResetPasswordPage from "../src/services/ResetPassword";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApiProvider>
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/shop/:edad/:raza/:mascota/:medicado/:offer/:page" element={<Productoss />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </AppProvider>
  </ApiProvider>
);
