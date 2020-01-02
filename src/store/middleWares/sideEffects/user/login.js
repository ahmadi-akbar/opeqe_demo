import loginSideEffects from "../../../actions/user/loginSideEffects";
import fetchMenu from "../../../actions/menu/fetchMenu";
import {
    USER_SIGNUP,
    USER_LOGIN,
    DATA_FETCH_FULFILLED
} from "../../../config/actionNames";

export default (store, action) => {
    const {
        type
    } = action;

    if (ignoreCond(type)) {
        return;
    }

    const {
        dispatch,
        getState
    } = store;

    loginSideEffects()(dispatch, getState);
    fetchMenu()(dispatch, getState);
};

const ignoreCond = type => {
    return (
        type !== `${USER_LOGIN}${DATA_FETCH_FULFILLED}` &&
        type !== `${USER_SIGNUP}${DATA_FETCH_FULFILLED}`
    );
};