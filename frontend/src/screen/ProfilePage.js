import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Alert from "../components/shared/Alert";
import Spinner from "../components/shared/Spinner";
import {
  userProfile,
  updateUserProfile,
  deleteUser,
  logout,
} from "../actions/userAction";
import { listMyOrders } from "../actions/orderAction";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message] = useState("");

  const [name, setName] = useState("");

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, user } = userDetails;

  const { userLoginInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, orders, error: errorOrders } = orderListMy;

  const orderCreate = useSelector((state) => state.orderCreate);
  // deleting the Account
  const deleteAccount = () => {
    dispatch(deleteUser(email));
    dispatch(logout());
  };

  // 
  useEffect(() => {
    if (!userLoginInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(userProfile("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userLoginInfo, user, dispatch, orderCreate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
    dispatch(userProfile("profile"));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div>
            <div className="row justify-content-center">
              <div
                className="col-md-12 my-5"
                style={{ backgroundColor: "#d5efc2" }}
              >
                <h3 className="text-center">Update Information</h3>
                {error && <Alert variation={"success"} child={error} />}
                {success && (
                  <Alert variation={"success"} child={"Profile Updated"} />
                )}
                {loading && <Spinner />}
                {message && <Alert variation={"danger"} child={message} />}
                <form onSubmit={submitHandler}>
                  <div className="mx-auto my-3 col-md-8">
                    <label htmlFor="Name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mx-auto my-3 col-md-8">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mx-auto my-3 col-md-8">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mx-auto my-3 col-md-8">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmpassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="mx-auto my-3 col-md-8">
                    <button type="submit" className="btn btn-success my-3">
                      Update
                    </button>
                  </div>
                </form>
                {userLoginInfo && userLoginInfo.isAdmin ? (
                  " "
                ) : (
                  <div className="container">
                    <div className="row">
                      <Link
                        className="btn btn-success col-md-6 my-2"
                        to="/register"
                        onClick={() => deleteAccount()}
                      >
                        Delete Account
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">My Orders</h1>
          {loadingOrders ? (
            <Spinner />
          ) : error ? (
            <Alert variation={"danger"} child={errorOrders} />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">DATE</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">PAID</th>
                  <th scope="col">DELIVERED</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.created_at.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="mx-2"
                            style={{ color: "red" }}
                          />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="mx-2"
                            style={{ color: "red" }}
                          />
                        )}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <button className="btn btn-success">
                            Order Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
