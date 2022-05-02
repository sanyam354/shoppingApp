import axios from "axios";
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/productForCart";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      product: data._id,
      name: data.title.longTitle,
      image: data.detailUrl,
      price: data.price.cost,
      countInStock: data.countInStock,
      quantity,
    },
  });
  
  localStorage.setItem(
    "ItemsInCart",
    JSON.stringify(getState().cart.itemsInCart)
  );
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  
  localStorage.setItem(
    "ItemsInCart",
    JSON.stringify(getState().cart.itemsInCart)
  );
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
