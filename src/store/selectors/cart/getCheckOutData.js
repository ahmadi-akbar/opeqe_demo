import getItemTotals from "./getItemTotals";

export default state => getData(state.cart.details);

const getData = cart => {
    const out = {
        quantity: 0,
        price: 0,
        preparation: 0,
        fee: {
            delivery: 0,
            service: 0,
        },
        items: [],
        tax: 0,
        discount: [],
        total: 0,
    }

    const totalItemsData = getItemTotals(cart);

    out.tax = totalItemsData.tax;
    out.fee = totalItemsData.fees;
    out.discount = totalItemsData.rewards.concat(totalItemsData.specials);
    out.preparation = totalItemsData.preparation;
    out.price = totalItemsData.totals.price;
    out.quantity = totalItemsData.totals.quantity;

    out.items = cart.items.map(item => {
        return {
            menuId: item.id,
            title: item.title,
            quantity: item.quantity,
            note: item.note,
            price: item.price,
            total: item.total,
            preparation: item.preparation,
            instructions: item.instructions,
            indexes: JSON.stringify(
                stringifyIndexes(item.indexes)
            ),
        };
    });

    const totalDiscount = out.discount.reduce((total, discount) => total + discount.amount, 0);


    let total = out.price;
    total += out.tax;
    total -= totalDiscount;
    total += out.fee.delivery;
    total += out.fee.service;
    out.total = total;

    return out;
}




const stringifyIndexes = indexes => {
    console.log('>>>', indexes);
    const out = [];
    for (let i = 0; i < indexes.length; i++) {
        console.log("LOOP", indexes[i]);
        indexes[i].forEach(index => {
            out.push([i, index]);
        })
    }

    return out;
}