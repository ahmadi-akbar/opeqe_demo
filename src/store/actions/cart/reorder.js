import addItem from "./addItem";

export default id => (dispatch, getState) => {
    const state = getState();

    const history = state.cart.history.list;
    const order = history.find(historyOrder => historyOrder.id === id);
    console.log(order.items);
    order.items.forEach(item => addItem({
        id: item.menuId,
        count: item.quantity,
        instructions: item.instruction,
        note: item.note,
        selectionArray: JSON.parse(item.indexes),
    })(dispatch, getState));

};