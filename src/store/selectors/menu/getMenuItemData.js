import {
    createSelector
} from 'reselect';

import mapItems from "./functions/mapItems";
import orderTypeToTxt from "./functions/orderTypeToTxt";

export default () => createSelector(
    [
        selectItem,
        state => state.menu.items,
        state => state.menu.instructions.data,
        state => state.menu.favoriteItems.data,
        state => state.user.deliveryCondition
    ],
    (item, items, instructions, favoriteIDs, deliveryCondition) => {

        if (!item) {
            return {
                data: {},
            }
        }

        const fee = items.data.fee;
        const feeLabel = orderTypeToTxt(deliveryCondition.type, fee);
        const data = mapItems(item, instructions[item.id], favoriteIDs);

        return {
            data: data,
            feeLabel: feeLabel,
            deliveryFee: fee,
            rewards: items.data.rewards,
        };
    },
);


const selectItem = (state, props) => {
    const items = state.menu.items;
    const itemsIfExists = items.data.items;

    if (!itemsIfExists) {
        return false;
    }

    for (let i = 0; i < itemsIfExists.length; i++) {
        if (itemsIfExists[i].id === props.itemId) {
            return itemsIfExists[i];
        }
    }

    return false;
}