import addToCart from "./functions/addToCart";
import removeFromCart from "./functions/removeFromCart";
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  DATA_FETCH_FULFILLED,
  SUBMIT_SHOPPING_CART,
  CLEAR_SHOPPING_CART
} from "../../config/actionNames/";

export const initialState = {
  id: null,
  rewards: [],
  items: [],
  orderCondition: {},
  orderNote: null,
  gratuity: 0,
  deliveryGratuity: 0,
  date: null,
  delivery: {
    fee: 0,
    time: 0
  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ITEM_TO_CART: {
      return addToCart(state, payload);
    }
    case REMOVE_ITEM_FROM_CART: {
      return removeFromCart(state, payload);
    }
    case CLEAR_SHOPPING_CART: {
      return initialState;
    }
    case `${SUBMIT_SHOPPING_CART}${DATA_FETCH_FULFILLED}`: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
