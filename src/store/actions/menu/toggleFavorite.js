import {
    TOGGLE_MENU_ITEM_FAVORITE,
    SET_USER_FAVORITE_MENU_ITEMS,
} from "../../config/actionNames";
import addToFavorite from "../../../api/menu/addToFavorite";
import {
    addToQueue
} from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import selectFavoriteItemIds from "../../selectors/menu/selectFavoriteItemIds";

export default id => (dispatch, getState) => {

    dispatch({
        type: TOGGLE_MENU_ITEM_FAVORITE,
        payload: id,
    });

    const state = getState();

    const dataForAPI = {
        menuId: selectFavoriteItemIds(state)
    };

    dispatch(
        addToQueue({
                type: [SET_USER_FAVORITE_MENU_ITEMS],
            },
            addToFavorite(
                addAuth(dataForAPI, state)
            ), {
                retry: true,
                delay: {
                    timeout: 5,
                }
            }
        )
    )
}