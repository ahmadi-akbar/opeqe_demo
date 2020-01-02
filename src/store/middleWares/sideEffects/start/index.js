import fetchMenu from "../../../actions/menu/fetchMenu";
import fetchReferral from "../../../actions/user/fetchReferral";
import {
    APP_START_ACTION_NAME
} from "../../../redux-pwa";

export default (store, action) => {
    const {
        dispatch,
        getState
    } = store;
    const {
        type
    } = action;

    if (ignoreCond(type)) {
        return;
    }

    fetchMenu()(dispatch, getState);
    fetchReferral()(dispatch, getState);
};

const ignoreCond = type => {
    return type !== APP_START_ACTION_NAME;
};