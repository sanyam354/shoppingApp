import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../shared/Spinner";
import Alert from "../shared/Alert";
import { deliverOrder, getAllOrders } from "../../actions/orderAction";

const OrderList = () => {
  const dispatch = useDispatch();
  const allOrdersState = useSelector((state) => state.allUserOrdersReducer);
  const { loading, orders, error } = allOrdersState;

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <>
      <h1>OrderList</h1>
      {loading && <Spinner />}
      {error && (
        <Alert variation="danger" child="admin Order request Failed!" />
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">User Id</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Paid</th>

            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user}</td>
                <td>Rs {order.totalPrice}/-</td>
                <td>{order.created_at.substring(0, 10)}</td>
                <td>{order.isPaid ? "Paid" : "Not Paid"}</td>
                <td>
                  {order.isDelivered ? (
                    <h6>Delivered</h6>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => dispatch(deliverOrder(order._id))}
                      disabled={!order.isPaid}
                    >
                      {order.isPaid ? "Deliver" : "Not Paid"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderList;
