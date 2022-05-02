import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import {
  allAdminUsers,
  deleteUserByAdmin,
  changeAdmin,
  logout,
} from "../../actions/userAction";
import Alert from "../shared/Alert";
import Spinner from "../shared/Spinner";
const UsersList = () => {
  //
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.usersAdminListReducer);
  const { loading, users, error } = userState;
  //
  useEffect(() => {
    dispatch(allAdminUsers());
  }, [dispatch]);

  const adminChangeHandler = (userId) => {
    dispatch(changeAdmin(userId));

    dispatch(logout());
  };

  return (
    <>
      <h1>UsersList</h1>
      {loading && <Spinner />}
      {error && <Alert variation="danger" child="Error while fetching Users" />}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">UserID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Delete</th>
            <th scope="col">Admin Change</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {!user.isAdmin ? (
                    <Link to="">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="mx-2"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          dispatch(deleteUserByAdmin(user._id));
                        }}
                      />
                    </Link>
                  ) : (
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      className="mx-2"
                      style={{ color: "green" }}
                    />
                  )}
                  {/* */}
                </td>
                <td>
                  {" "}
                  <button
                    className="btn btn-success"
                    disabled={user.isAdmin}
                    onClick={() => adminChangeHandler(user._id)}
                  >
                    {user.isAdmin ? "Admin" : "change Admin"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
