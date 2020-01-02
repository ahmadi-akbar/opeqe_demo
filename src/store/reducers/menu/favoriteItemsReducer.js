import produce from "immer";

import dataFetchStatusReducer, {
  initialFetchStatus
} from "../helpers/dataFetchStatus";
import {
  SET_USER_FAVORITE_MENU_ITEMS,
  TOGGLE_MENU_ITEM_FAVORITE,
  FETCH_MENU_ITEMS,
  DATA_FETCH_FULFILLED
} from "../../config/actionNames/";

export const initialState = {
  status: initialFetchStatus,
  data: {}
};

export default (state = initialState, action) => {
  const { status } = state;

  const setFavoritesStatus = dataFetchStatusReducer(
    status,
    action,
    SET_USER_FAVORITE_MENU_ITEMS
  );

  return produce(state, finalState => {
    finalState.status = setFavoritesStatus;

    const { type, payload } = action;

    switch (type) {
      case TOGGLE_MENU_ITEM_FAVORITE: {
        const favorites = finalState.data;
        if (favorites[payload]) {
          delete favorites[payload];
        } else {
          favorites[payload] = true;
        }
        break;
      }
      case `${FETCH_MENU_ITEMS}${DATA_FETCH_FULFILLED}`: {
        finalState.data = {};
        const newItems = payload.items;
        newItems.forEach(item => {
          if (item.isFavorite) {
            finalState.data[item.id] = true;
          }
        });
        break;
      }
      default:
        break;
    }

    return finalState;
  });
};
