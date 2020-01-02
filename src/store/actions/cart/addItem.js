import {
    ADD_ITEM_TO_CART
} from "../../config/actionNames";
import getMenuItemData from "../../selectors/menu/getMenuItemData";
import uuid from "../../../functions/uuid";

export default ({
    id,
    count,
    instructions,
    note,
    selectionArray,
}) => (dispatch, getState) => {
    const itemData = getMenuItemData()(
        getState(), {
            itemId: id
        }
    );

    dispatch({
        type: ADD_ITEM_TO_CART,
        payload: {
            id: itemData.data.id,
            key: uuid(),
            title: itemData.data.title,
            quantity: count,
            note: note,
            price: itemData.data.price,
            total: itemData.data.price * count,
            fee: itemData.deliveryFee,
            image: itemData.data.image,
            preparation: itemData.data.preparation,
            instructions: instructions,
            rewards: itemData.rewards,
            deliveryTime: itemData.data.deliveryTime,
            special: itemData.data.special,
            indexes: selectionArray,
        },
    });
}