import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/order`, order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/order/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/order/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/order/myorders`, config);

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};
// Admin requesting all orders
export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };
    const res = await axios.get(`/api/order/allUserOrder`, config);
    // console.log(res);
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// updating the delevery status of the OrderId
export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };
    const res = await axios.post(
      `/api/order/deliverOrder`,
      { orderId },
      config
    );
    console.log(res);
    const order = await axios.get(`/api/order/allUserOrder`, config);
    // initials
    window.location.reload();
    //
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: order.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};
