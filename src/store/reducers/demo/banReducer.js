import produce from "immer";

import {
  SET_ACCOUNT_BAN,
  FETCH_MENU_ITEMS,
  DATA_FETCH_REJECTED,
  FETCH_RESERVE_HISTORY,
  USER_LOGIN
} from "../../config/actionNames/";

import {
  storeBanCode,
  userBanCode,
  loginStoreNotFound
} from "../../../config/api";

export const initialState = {
  user: false,
  store: false,
  server: false
};

export default (state = initialState, action) => {
  return produce(state, finalState => {
    const { type, payload } = action;

    switch (type) {
      case SET_ACCOUNT_BAN: {
        switch (payload.target) {
          case "store": {
            finalState.store = payload.isBanned;
            break;
          }
          case "user": {
            finalState.user = payload.isBanned;
            break;
          }
          case "server": {
            finalState.server = payload.isBanned;
            break;
          }
          default:
            break;
        }
        break;
      }
      case `${USER_LOGIN}${DATA_FETCH_REJECTED}`: {
        if (payload && payload.data) {
          if (payload.data === loginStoreNotFound) {
            finalState.server = true;
          }
        }
        break;
      }
      case `${FETCH_MENU_ITEMS}${DATA_FETCH_REJECTED}`: {
        if (payload && payload.status) {
          if (payload.status === storeBanCode) {
            finalState.store = true;
          }
          if (payload.status === userBanCode) {
            finalState.user = true;
          }
        }
        break;
      }
      case `${FETCH_RESERVE_HISTORY}${DATA_FETCH_REJECTED}`: {
        if (payload && payload.status) {
          if (payload.status === storeBanCode) {
            finalState.store = true;
          }
          if (payload.status === userBanCode) {
            finalState.user = true;
          }
        }
        break;
      }
      default: {
        break;
      }
    }

    return finalState;
  });
};
