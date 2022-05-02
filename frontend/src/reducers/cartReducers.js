import {
  ADD_CART_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  REMOVE_CART_ITEM,
} from "../constants/productForCart";

export const cartReducer = (state = { itemsInCart: [] }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;

      const itemExisted = state.itemsInCart.find(
        (p) => p.product === item.product
      );
      if (itemExisted) {
        return {
          ...state,
          itemsInCart: state.itemsInCart.map((p) =>
            p.product === itemExisted.product ? item : p
          ),
        };
      } else {
        return {
          ...state,
          itemsInCart: [...state.itemsInCart, item],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (p) => p.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    default:
      return state;
  }
};
