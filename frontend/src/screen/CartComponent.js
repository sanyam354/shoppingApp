import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Alert from "../components/shared/Alert";

import { addToCart, removeItemFromCart } from "../actions/cartActions";
const CartComponent = () => {
  const { id } = useParams();
  const qty = useLocation().search;
  const quantity = qty ? qty.split("=")[1] : 1;
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart);

  const { itemsInCart } = cartItems;

  const removeProductFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkOut = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      {itemsInCart.length === 0 ? (
        <>
          <div className="mx-3 my-2">
          <Alert variation="success" child="Your Cart is Empty!" />
            <Link className="mx-2" to="/">
              <button className="btn btn-success">Go Back</button>
            </Link>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="row my-3">
            <div className="col-md-8">
              {itemsInCart.map((item) => (
                <div className="card mb-3" key={item.product}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.image}
                        className="img-fluid rounded-start mx-auto d-block"
                        alt="..."
                        style={{ height: 150 }}
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link
                            to={`/product/${item.product}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {item.name}
                          </Link>
                        </h5>
                        <div className="card-title">
                          <h5>Price:{item.price}</h5>
                        </div>
                        <div className="card-title">
                          <h5>Quantity:{item.quantity}</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex">
                      {" "}
                      <form
                        className="col-md-6 "
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        <select className="my-4">
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </form>
                      <div className="col-md-6">
                        <FontAwesomeIcon
                          style={{ width: 20, height: 20, color: "red" }}
                          icon={faTrash}
                          className="mx-2 my-4"
                          type="button"
                          onClick={() =>
                            removeProductFromCartHandler(item.product)
                          }
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4  ">
              <div
                className="card border-success mb-3 mx-auto "
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header bg-transparent border-success">
                  <h2>
                    Total:(
                    {itemsInCart.reduce(
                      (acc, value) => acc + parseInt(value.quantity),
                      0
                    )}
                    )
                  </h2>{" "}
                </div>
                <div className="card-body ">
                  <h5 className="card-title">
                    Price:(
                    {itemsInCart
                      .reduce(
                        (acc, value) =>
                          acc + Number(value.quantity) * Number(value.price),
                        0
                      )
                      .toFixed(2)}
                    )
                  </h5>
                </div>

                <button
                  type="button"
                  className="btn btn-success"
                  disabled={itemsInCart.length === 0}
                  onClick={checkOut}
                >
                  Procced To Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartComponent;
