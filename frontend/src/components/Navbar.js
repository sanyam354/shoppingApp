import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { listMyOrders } from "../actions/orderAction";

function Navbar() {
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { userLoginInfo: updateUserLoginInfo } = userUpdateProfile;

  const { userLoginInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const profileHandler = (e) => {
    e.preventDefault();
    navigate("/profile");
    dispatch(listMyOrders());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ONLINE SHOP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent "
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <div className="">
              <li className="nav-item ">
                <Link className="nav-link" aria-current="page" to="/cart">
                  Cart
                  <FontAwesomeIcon icon={faCartShopping} className="mx-2" />
                </Link>
              </li>
            </div>

            {/*  */}
            {userLoginInfo ? (
              <div className="dropdown " aria-current="page">
                <div
                  className="btn btn-secondary dropdown-toggle "
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {updateUserLoginInfo
                    ? updateUserLoginInfo.name
                    : userLoginInfo.name}
                </div>

                <ul
                  className="dropdown-menu "
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <button className="dropdown-item" onClick={profileHandler}>
                      Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logOutHandler}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/login">
                    Signin
                    <FontAwesomeIcon icon={faUser} className="mx-2" />
                  </Link>
                </li>
              </>
            )}
            {userLoginInfo && userLoginInfo.isAdmin ? (
              <div className="">
                <li className="nav-item ">
                  <Link className="nav-link" aria-current="page" to="/admin">
                    Admin Panel
                    <FontAwesomeIcon icon={faList} className="mx-2" />
                  </Link>
                </li>
              </div>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
