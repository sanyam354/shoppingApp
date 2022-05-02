import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILS,
  PRODUCT_ITEMDETAILS_REQUEST,
  PRODUCT_ITEMDETAILS_SUCCESS,
  PRODUCT_ITEMDETAILS_FAILS,
  POST_REVIEW_FAIL,
  POST_REVIEW_SUCCESS,
  POST_REVIEW_REQUEST,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  ADD_NEW_PRODUCT_FAIL,
  ADD_NEW_PRODUCT_REQUEST,
  ADD_NEW_PRODUCT_SUCCESS,
  POST_PRODUCT_BY_ID_REQUEST,
  POST_PRODUCT_BY_ID_SUCCESS,
  POST_PRODUCT_BY_ID_FAIL,
  EDIT_PRODUCT_BY_ID_REQUEST,
  EDIT_PRODUCT_BY_ID_SUCCESS,
  EDIT_PRODUCT_BY_ID_FAIL,
} from "../constants/constantsProduct";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productItemDetails = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_ITEMDETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_ITEMDETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ITEMDETAILS_FAILS:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postReviewReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case POST_REVIEW_REQUEST:
      return { loading: true };

    case POST_REVIEW_SUCCESS:
      return { loading: false, review: [action.payload] };

    case POST_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return { loading: true };
    case DELETE_REVIEW_SUCCESS:
      return { loading: false };
    case DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// new product addition by an admin
export const addNewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_PRODUCT_REQUEST:
      return { loading: true, ...state };
    case ADD_NEW_PRODUCT_SUCCESS:
      return { loading: false, newproduct: action.payload, success: true };
    case ADD_NEW_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// get Product By id by Admin
export const postProductByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_PRODUCT_BY_ID_REQUEST:
      return { loading: true, ...state };
    case POST_PRODUCT_BY_ID_SUCCESS:
      return { loading: false, getProduct: action.payload };
    case POST_PRODUCT_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// update
export const updateProductByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_BY_ID_REQUEST:
      return { updateLoading: true, ...state };

    case EDIT_PRODUCT_BY_ID_SUCCESS:
      return {
        updateLoading: false,
        updatedProduct: action.payload,
        updatedsuccess: true,
      };
    case EDIT_PRODUCT_BY_ID_FAIL:
      return { updateLoading: false, updatederror: action.payload };
    default:
      return state;
  }
};
