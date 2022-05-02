import React from "react";
import { Link } from "react-router-dom";

const CheckOutPath = ({ path1, path2, path3, path4 }) => {
  return (
    <>
      <nav aria-label="breadcrumb d-flex">
        <ol className="breadcrumb justify-content-center">
          {path1 ? (
            <li className="breadcrumb-item active">
              <Link
                to="/login"
                style={{ color: "black", textDecoration: "none" }}
              >
                Sign In
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item " aria-current="page">
              <Link
                to=""
                style={{
                  color: "#c4b9d5",
                  textDecoration: "none",
                  cursor: "auto",
                }}
              >
                Sign In
              </Link>
            </li>
          )}
          {path2 ? (
            <li className="breadcrumb-item active">
              <Link
                to="/shipping"
                style={{ color: "black", textDecoration: "none" }}
              >
                Shipping
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item " aria-current="page">
              <Link
                to=""
                style={{
                  color: "#c4b9d5",
                  textDecoration: "none",
                  cursor: "auto",
                }}
              >
                Shipping
              </Link>
            </li>
          )}
          {path3 ? (
            <li className="breadcrumb-item active">
              <Link
                to="/payment"
                style={{ color: "black", textDecoration: "none" }}
              >
                Payment
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item " aria-current="page">
              <Link
                to=""
                style={{
                  color: "#c4b9d5",
                  textDecoration: "none",
                  cursor: "auto",
                }}
              >
                Payment
              </Link>
            </li>
          )}
          {path4 ? (
            <li className="breadcrumb-item active">
              <Link
                to="/placeorder"
                style={{ color: "black", textDecoration: "none" }}
              >
                Place your order
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item " aria-current="page">
              <Link
                to=""
                style={{
                  color: "#c4b9d5",
                  textDecoration: "none",
                  cursor: "auto",
                }}
              >
                Place your order
              </Link>
            </li>
          )}
        </ol>
      </nav>
    </>
  );
};

export default CheckOutPath;
