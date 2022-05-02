import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  
  function truncate(str) {
    return str.split(" ").length > 1
      ? str.split(" ").splice(0, 6).join(" ") + "..."
      : str.length > 20
      ? str.slice(0, 10) + "..."
      : str;
  }

  return (
    <>
      <div className="card ">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.detailUrl}
            className="card-img-top rounded mx-auto d-block "
            alt="..."
            style={{ height: 150, width: 150 }}
          />
        </Link>
        <div className="card-body">
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h5 className="card-title">
              {truncate(product.title.longTitle)}
            </h5>
          </Link>

          <p className="card-text ">mrp:{product.price.mrp}</p>
          <p className="card-text ">cost:{product.price.cost}</p>
          <p className="card-text ">Discount:{product.price.discount}</p>
          <p className="card-text "></p>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
