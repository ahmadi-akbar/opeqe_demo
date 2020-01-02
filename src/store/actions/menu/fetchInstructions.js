import {
    FETCH_MENU_ITEM_INSTRUCTIONS
} from "../../config/actionNames";
import getMenuInstruction from "../../../api/menu/getMenuInstruction";
import {
    addToQueue
} from "../../redux-pwa";
import addAuth from "../helpers/addAuth";

export default id => (dispatch, getState) => {
    const dataForAPI = {
        id: id,
    }

    const dataForStore = id;

    dispatch(
        addToQueue({
                type: [FETCH_MENU_ITEM_INSTRUCTIONS],
                payload: dataForStore
            },
            getMenuInstruction(
                addAuth(dataForAPI, getState())
            ), {
                retry: true,
            }
        )
    );
}