import {
    FETCH_MENU_ITEMS
} from "../../config/actionNames";
import getMenuAPI from "../../../api/menu/getMenu";
import {
    addToQueue
} from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import getUserDefaultAddress from "../../selectors/user/getUserDefaultAddress";

export default data => (dispatch, getState) => {
    const state = getState();
    const address = getUserDefaultAddress(state);

    const addressData = address ? {
        latitude: address.latitude,
        longitude: address.longitude,
    } : {}

    const dataWithAddress = {
        ...data,
        ...addressData,
    }
    dispatch(
        addToQueue({
                type: [FETCH_MENU_ITEMS],
            },
            getMenuAPI(
                addAuth(dataWithAddress, getState())
            ), {
                retry: true,
            }
        )
    );
}