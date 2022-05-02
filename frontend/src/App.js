import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartComponent from "./screen/CartComponent";
import LoginForm from "./screen/LoginForm";
import ProductDetails from "./screen/ProductDetails";
import Products from "./screen/Products";
import RegisterForm from "./screen/RegisterForm";
import ProfilePage from "./screen/ProfilePage";
import ShippingPage from "./screen/ShippingPage";
import PaymentPage from "./screen/PaymentPage";
import PlaceOrder from "./screen/PlaceOrder";
import OrderPage from "./screen/OrderPage";
import Admin from "./screen/Admin";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/admin/*" element={<Admin />} />

          <Route path="/product/:id" element={<ProductDetails />} exact />
          <Route path="/cart/:id" element={<CartComponent />} />
          <Route path="/cart" element={<CartComponent />} />

          <Route path="/" element={<Products />} exact />
          <Route path="/login" element={<LoginForm />} exact />
          <Route path="/shipping" element={<ShippingPage />} exact />

          <Route path="/register" element={<RegisterForm />} exact />
          <Route path="/profile" element={<ProfilePage />} exact />
          <Route path="/payment" element={<PaymentPage />} exact />
          <Route path="/placeorder" element={<PlaceOrder />} exact />
          <Route path="/order/:orderId" element={<OrderPage />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
