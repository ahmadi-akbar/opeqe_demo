import {
    FETCH_MENU_ITEM_DATA
} from "../../config/actionNames";
import getMenuById from "../../../api/menu/getMenuById";
import {
    addToQueue
} from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default data => (dispatch, getState) => {
    dispatch(
        addToQueue({
                type: [FETCH_MENU_ITEM_DATA],
            },
            getMenuById(
                addAuth(data, getState())
            ), {
                retry: true,
            }
        )
    );
}