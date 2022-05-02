import axios from "axios";
import swal from "sweetalert";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_PROFILE_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_REGISTER_RESET,
  GET_ALL_USERS_FOR_ADMIN_REQUEST,
  GET_ALL_USERS_FOR_ADMIN_FAIL,
  GET_ALL_USERS_FOR_ADMIN_SUCCESS,
} from "../constants/userConstants";

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userInformation");
  dispatch({ type: USER_PROFILE_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    // fetching out token and we will save in the local storage
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInformation", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // User got automatically signed in using below after registeration . Below dispatch is optional
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInformation", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.message
      : error.message,
    });
  }
};

export const userProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });
    // Destructuring the userLoginInfo to get previous state and update it.
    const {
      userLogin: { userLoginInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// delete the user

export const deleteUser = (email) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/delete`, config);
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });

    dispatch({ type: USER_DELETE_RESET });
    dispatch({ type: USER_REGISTER_RESET });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// get All Users of the Admin
export const allAdminUsers = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };
    dispatch({ type: GET_ALL_USERS_FOR_ADMIN_REQUEST });
    const { data } = await axios.get("/api/users/getAllAdminUsers", config);

    dispatch({ type: GET_ALL_USERS_FOR_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FOR_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// delete user by an admin
export const deleteUserByAdmin = (userId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };
    const res = await axios.post(
      "/api/users/adminDeleteUser",
      { userId },
      config
    );
    console.log(res);
    swal("User Deleted successfully", "success");
    window.location.reload();
  } catch (error) {
    swal("Error while Deleting User");
  }
};

// changing the admin
export const changeAdmin = (userId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };
    swal("Admin changed Successfully", "success");

    const res = await axios.post("/api/users/changeAdmin", { userId }, config);
    console.log(res);
  } catch (error) {
    swal("Error while Changing admin", "success");
  }
};
