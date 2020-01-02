import produce from "immer";

import dataFetchStatusReducer, {
  initialFetchStatus
} from "../helpers/dataFetchStatus";
import {
  FETCH_MENU_ITEM_INSTRUCTIONS,
  DATA_FETCH_FULFILLED
} from "../../config/actionNames/";

export const initialState = {
  status: initialFetchStatus,
  data: {}
};

export default (state = initialState, action) => {
  const { status } = state;

  const instructionsFetchStatus = dataFetchStatusReducer(
    status,
    action,
    FETCH_MENU_ITEM_INSTRUCTIONS
  );

  return produce(state, finalState => {
    finalState.status = instructionsFetchStatus;

    const { type, payload, meta } = action;

    switch (type) {
      case `${FETCH_MENU_ITEM_INSTRUCTIONS}${DATA_FETCH_FULFILLED}`: {
        finalState.data[meta] = payload;
        break;
      }
      default:
        break;
    }

    return finalState;
  });
};
