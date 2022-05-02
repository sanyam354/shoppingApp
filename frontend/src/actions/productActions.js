import axios from "axios";
import swal from "sweetalert";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILS,
  PRODUCT_ITEMDETAILS_FAILS,
  PRODUCT_ITEMDETAILS_REQUEST,
  PRODUCT_ITEMDETAILS_SUCCESS,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  ADD_NEW_PRODUCT_REQUEST,
  ADD_NEW_PRODUCT_SUCCESS,
  ADD_NEW_PRODUCT_FAIL,
  POST_PRODUCT_BY_ID_REQUEST,
  POST_PRODUCT_BY_ID_SUCCESS,
  POST_PRODUCT_BY_ID_FAIL,
  EDIT_PRODUCT_BY_ID_FAIL,
  EDIT_PRODUCT_BY_ID_SUCCESS,
  EDIT_PRODUCT_BY_ID_REQUEST,
} from "../constants/constantsProduct";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    
    dispatch({
      type: PRODUCT_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

export const productItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ITEMDETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_ITEMDETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_ITEMDETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// post Creation

export const postCreate = (rating, comment, id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: POST_REVIEW_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };
    const myReview = { rating, comment };

    const { data } = await axios.post(`/api/review/${id}`, myReview, config);
    dispatch({ type: POST_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

export const deleteReviewAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/deletePost/${id}`, {}, config);

    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data });
    dispatch({ type: DELETE_REVIEW_RESET });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// filter
export const filterProduct = (searchKey, category) => async (dispatch) => {
  let filterProduct;
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const res = await axios.get("/api/products");
    // console.log(res);
    filterProduct = res.data.filter(
      (p) =>
        p.title &&
        p.title.longTitle
          .toString()
          .toLowerCase()
          .includes(searchKey)
    );

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: filterProduct });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// filter on price
export const filterCategoryProduct = (category) => async (dispatch) => {
  let filterCategoryProducts;
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const res = await axios.get("/api/products");

    if (category === "cost") {
      filterCategoryProducts = res.data.sort(function(a, b) {
        return a.price.cost - b.price.cost;
      });
    }
    if (category === "mrp") {
      filterCategoryProducts = res.data.sort(function(a, b) {
        return a.price.mrp - b.price.mrp;
      });
    }

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: filterCategoryProducts });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// Add a new product by admin
export const addNewProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_NEW_PRODUCT_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };

    const data = await axios.post(
      "/api/products/addNewProduct",
      { product },
      config
    );

    dispatch({ type: ADD_NEW_PRODUCT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ADD_NEW_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// Edit product by admin
// 1.get Product by Id
export const getProductById = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_PRODUCT_BY_ID_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };
    // console.log({ productId });
    const data = await axios.post(
      "/api/products/getProductById",
      { productId },
      config
    );

    dispatch({ type: POST_PRODUCT_BY_ID_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: POST_PRODUCT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// 2. Edit Product By Id
export const updateProduct = (updatedProduct) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_PRODUCT_BY_ID_REQUEST });
    const {
      userLogin: { userLoginInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLoginInfo.token}`,
      },
    };

    const data = await axios.post(
      "/api/products/updatedProduct",
      { updatedProduct },
      config
    );

    dispatch({ type: EDIT_PRODUCT_BY_ID_SUCCESS, payload: data.data });
    window.location.href = "/admin/productList";
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.message
          : error.message,
    });
  }
};

// delete the product
export const deleteProduct = (productId) => async (dispatch, getState) => {
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
      "/api/products/deleteProduct",
      { productId },
      config
    );
    console.log(res);
    swal("Product Deleted Successfully!", "success");
    window.location.href = "/admin/productList";
  } catch (error) {
    swal("error While deleting product", "error");
  }
};
