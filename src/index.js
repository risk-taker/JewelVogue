import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductContextProvier } from "./context/ProductContext";
import { CartContextProvider } from "./context/CartContext";
import { AuthContextProvider } from "./context/AuthContext";
import { WishlistContextProvider } from "./context/WishlistContext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ProductContextProvier>
          <WishlistContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </WishlistContextProvider>
        </ProductContextProvier>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
