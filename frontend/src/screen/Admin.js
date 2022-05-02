import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UsersList from "../components/Admin/UsersList";
import ProductList from "../components/Admin/ProductList";
import AddNewProduct from "../components/Admin/AddNewProduct";
import OrderList from "../components/Admin/OrderList";
import EditProduct from "../components/Admin/EditProduct";
const Admin = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userLoginInfo } = userLogin;
  useEffect(() => {
    if (
      localStorage.getItem("userInformation") === null ||
      !userLoginInfo.isAdmin
    )
      window.location.href = "/";
  }, [dispatch, userLoginInfo]);

  return (
    <>
      <div className="container my-2">
        <div className="row">
          <h1 className="col-md-12 text-center bg-success p-2 text-white bg-opacity-50">
            Admin
          </h1>
        </div>
      </div>
      <div className="container my-2">
        <div className="row">
          <div className="col-md-2">
            <div className="container ">
              <div className="row ">
                <div className="col-md-10 btn-group-vertical">
                  <button
                    type="button"
                    className="btn btn-dark my-2 rounded"
                    style={{ height: "80px" }}
                    onClick={() => navigate("/")}
                  >
                    Go Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-success my-2 rounded"
                    style={{ height: "80px" }}
                    onClick={() => navigate("/admin/usersList")}
                  >
                    All Users
                  </button>
                  <button
                    type="button"
                    className="btn btn-success my-2 rounded "
                    style={{ height: "80px" }}
                    onClick={() => navigate("/admin/productList")}
                  >
                    All Products
                  </button>
                  <button
                    type="button"
                    className="btn btn-success my-2 rounded "
                    style={{ height: "80px" }}
                    onClick={() => navigate("/admin/addNewProduct")}
                  >
                    Add New Product
                  </button>
                  <button
                    type="button"
                    className="btn btn-success my-2 rounded "
                    style={{ height: "80px" }}
                    onClick={() => navigate("/admin/orderList")}
                  >
                    All Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-10 my-2">
            <Routes>
              <Route path="" element={<UsersList />} exact />
              <Route
                path="editProduct/:productId"
                element={<EditProduct />}
                exact
              />

              <Route path="usersList" element={<UsersList />} exact />
              <Route path="productList" element={<ProductList />} exact />
              <Route path="addNewProduct" element={<AddNewProduct />} exact />
              <Route path="orderList" element={<OrderList />} exact />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
