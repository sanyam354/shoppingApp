import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productItemDetails,
  deleteReviewReducer,
  addNewProductReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userProfileUpdateReducer,
  userDeleteReducer,
  usersAdminListReducer,
} from "./reducers/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  allUserOrdersReducer,
} from "./reducers/orderReducer";
import {
  postReviewReducer,
  postProductByIdReducer,
  updateProductByIdReducer,
} from "./reducers/productReducer";

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : { address: "", city: "", postalCode: "", country: "" };

const userInformationFromStore = localStorage.getItem("userInformation")
  ? JSON.parse(localStorage.getItem("userInformation"))
  : null;

const cartItemsFromStorage = localStorage.getItem("ItemsInCart")
  ? JSON.parse(localStorage.getItem("ItemsInCart"))
  : [];

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productItemDetails,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userProfileReducer,
  userUpdateProfile: userProfileUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  myPost: postReviewReducer,
  deletePost: deleteReviewReducer,
  userDelete: userDeleteReducer,
  addNewProductReducer: addNewProductReducer,
  postProductByIdReducer: postProductByIdReducer,
  updateProductByIdReducer: updateProductByIdReducer,
  allUserOrdersReducer: allUserOrdersReducer,
  usersAdminListReducer: usersAdminListReducer,
});
const initialState = {
  cart: {
    itemsInCart: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userLoginInfo: userInformationFromStore },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
