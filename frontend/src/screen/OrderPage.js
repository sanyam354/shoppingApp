import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderAction";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import Alert from "../components/shared/Alert";
import Spinner from "../components/shared/Spinner";
const OrderPage = () => {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  if (!loading) {
    const addDecimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.orderItemPrice = addDecimal(
      order.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    );

    order.shippingPrice = addDecimal(order.orderItemPrice) > 500 ? 0 : 50;
    order.taxPrice = addDecimal(Number(0.2 * order.orderItemPrice).toFixed(2));
    order.totalPrice =
      Number(order.orderItemPrice) +
      Number(order.shippingPrice) +
      Number(order.taxPrice);
  }
  const newMultiplier = (a, b) => {
    return a * b;
  };

  useEffect(() => {
    if (!order || successPay) {
      dispatch(getOrderDetails(orderId));
    } else if (order._id === null) {
      dispatch(getOrderDetails(orderId));
    } else if (order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }

    dispatch({ type: ORDER_PAY_RESET });
  }, [orderId, dispatch, successPay, order]);

  const payOrderHandler = (paymentResult) => {
    paymentResult = {
      id: order._id,
      status: "success",
      update_time: Date.now(),
      email_address: order.user.email,
    };
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Spinner />
  ) : error ? (
    <Alert variation={"success"} child={error} />
  ) : (
    <div>
      <div className="container text-center my-3">
        <h3>Order Id: {order._id}</h3>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 border border-success">
            <h4>Shipping</h4>
            <p>
              <strong>Name&nbsp;:&nbsp;</strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email&nbsp;:&nbsp;</strong>
              {order.user.email}
            </p>
            <div>
              <strong>Address&nbsp;:</strong>
              &nbsp;{order.shippingAddress.address}
              &nbsp;{order.shippingAddress.city}
              &nbsp;{order.shippingAddress.postalCode}
              &nbsp;{order.shippingAddress.country}
              {order.isDelivered ? (
                <Alert variation={"success"} child={"Delivered"} />
              ) : (
                <Alert variation={"danger"} child={"Not Delivered"} />
              )}
            </div>
            <hr />
            <h3>Payment Method </h3>
            <div>
              <strong>Method&nbsp;:&nbsp;</strong>
              <strong>{order.paymentMethod}</strong>
              {order.isPaid ? (
                <Alert variation={"success"} child={"Paid"} />
              ) : (
                <Alert variation={"danger"} child={"Not Paid"} />
              )}
            </div>
            {/*  */}
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3>Order Items</h3>
                  {order.orderItems.length === 0 ? (
                    <Alert variation={"danger"} child={"Cart is Empty"} />
                  ) : (
                    <div className="container">
                      {order.orderItems.map((item, index) => (
                        <div key={`index ${index}`}>
                          <hr />
                          <div className="container my-2">
                            <div className="row">
                              <div className="col-md-2 text-center">
                                {index + 1}
                              </div>
                              <div className="col-md-4">
                                <Link
                                  to={`/product/${item.product}`}
                                  style={{
                                    color: "black",
                                    textDecoration: "none",
                                  }}
                                >
                                  {item.name}
                                </Link>
                              </div>

                              <div className="col-md-3">
                                {item.quantity}*{item.price}=
                                {newMultiplier(item.quantity, item.price)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
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
                      <h5 className="card-title">{order.orderItemPrice}</h5>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6">
                      <h5 className="card-title">Shipping:</h5>
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title">{order.shippingPrice}</h5>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6">
                      <h5 className="card-title">Tax:</h5>
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title">{order.taxPrice}</h5>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-6">
                      <h5 className="card-title">Total:</h5>
                    </div>
                    <div className="col-md-6">
                      <h5 className="card-title">{order.totalPrice}</h5>
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
                      disabled={order.orderItems === 0 || order.isPaid}
                      onClick={payOrderHandler}
                    >
                      {order.isPaid ? "PAID" : "PAY NOW"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
