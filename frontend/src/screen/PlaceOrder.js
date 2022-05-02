import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderAction";
import Alert from "../components/shared/Alert";
import CheckOutPath from "../components/shared/CheckOutPath";

const PlaceOrder = () => {
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, error, order } = orderCreate;

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimal(
    cart.itemsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  cart.shippingPrice = addDecimal(cart.itemsPrice) > 500 ? 0 : 50;
  cart.taxPrice = addDecimal(Number(0.2 * cart.itemsPrice).toFixed(2));
  cart.totalPrice =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);
  const multiplier = (a, b) => {
    return a * b;
  };
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.itemsInCart,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [success, navigate]);

  return (
    <>
      <CheckOutPath path1 path2 path3 path4 />
      <div className="container">
        <div className="col-md-6">
          <h3>Shipping</h3>
          <p>
            <strong>Address&nbsp;:&nbsp;</strong>
            &nbsp;{cart.shippingAddress.address}
            &nbsp;{cart.shippingAddress.city}
            &nbsp;{cart.shippingAddress.postalCode}
            &nbsp;{cart.shippingAddress.country}
          </p>
          <hr />
        </div>
      </div>
      <div className="container">
        <div className="col-md-6">
          <h3>Payment Method </h3>
          <p>{cart.paymentMethod}</p>

          <hr />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Order Items</h3>
            {cart.itemsInCart.length === 0 ? (
              <Alert variation={"danger"} child={"Cart is Empty"} />
            ) : (
              <div className="container">
                {cart.itemsInCart.map((item, index) => (
                  <div className="container my-2" key={`index ${index}`}>
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ height: "100%", width: "100%" }}
                        />
                      </div>
                      <div className="col-md-4">
                        <Link
                          to={`/product/${item.product}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-md-3">
                        {item.quantity}*{item.price}=
                        {multiplier(item.quantity, item.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-md-4 mx-3">
            <div
              className="card text-dark bg-light mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">
                <h3>Order Summary</h3>
              </div>
              <div className="card-body">
                <div className="container">
                  <div className="row my-2">
                    <div className="col-md-6">
                      <h5 className="card-title">Items:</h5>
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title">{cart.itemsPrice}</h5>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6">
                      <h5 className="card-title">Shipping:</h5>
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title">{cart.shippingPrice}</h5>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6">
                      <h5 className="card-title">Tax:</h5>
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title">{cart.taxPrice}</h5>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6">
                      <h5 className="card-title">Total:</h5>
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title">{cart.totalPrice}</h5>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-12">
                      {error && <Alert variation={"danger"} child={error} />}
                    </div>
                  </div>
                  <div className="row my-2">
                    <button
                      className="col-md-12 btn btn-success"
                      type="button"
                      disabled={cart.itemsInCart === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Your Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
