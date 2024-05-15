import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Blog from "./components/Blog/Blog";
import Home from "./components/Home/Home";
import BlogDetail from "./components/Blog/BlogDetail";
import Register from "./components/Member/Register";
import Login from "./components/Member/Login";
import Comment from "./components/Blog/Comment";
import Update from "./components/Member/Update";
import Add from "./components/My-product/Add";
import Product from "./components/My-product/Product";
import Edit from "./components/My-product/Edit";
import Producthome from "./components/My-product/Producthome";
import ProductDetail from "./components/My-product/ProductDetail";
import Cart from "./components/My-product/Cart";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="/blog/detail/:id" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/register" element={<Register />} />
          <Route path="/account" element={<Update />} />
          <Route path="/account/product/my-product" element={<Product />} />
          <Route path="/account/product/add" element={<Add />} />
          <Route path="/account/product/edit/:id" element={<Edit />} />
          <Route path="/account/product/home" element={<Producthome />} />
          <Route
            path="/account/product/prodetail/:id"
            element={<ProductDetail />}
          />
          <Route path="/account/product/cart" element={<Cart />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
