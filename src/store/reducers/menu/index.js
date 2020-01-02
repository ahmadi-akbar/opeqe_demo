import produce from 'immer';

import fetchMenuItemsReducer from "./fetchMenuItemsReducer";
import favoriteItemsReducer from "./favoriteItemsReducer";
import instructionsReducer from "./instructionsReducer";


export const initialState = {};

export default (state = initialState, action) => {

    const {
        items,
        instructions,
        favoriteItems,
    } = state;

    const fetchMenuItems = fetchMenuItemsReducer(items, action);
    const favoriteItemsReduced = favoriteItemsReducer(favoriteItems, action);
    const instructionsReduced = instructionsReducer(instructions, action);

    return produce(state, finalState => {
        finalState.items = fetchMenuItems;
        finalState.favoriteItems = favoriteItemsReduced;
        finalState.instructions = instructionsReduced;
    })
}