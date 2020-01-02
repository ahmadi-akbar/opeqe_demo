import {
    createSelector
} from "reselect";
import produce from "immer";

import mapItems from "./functions/mapItems";
import orderTypeToTxt from "./functions/orderTypeToTxt";

export default createSelector(
    [
        state => state.menu.items,
        state => state.menu.favoriteItems.data,
        state => state.user.deliveryCondition
    ],
    (items, favoriteIDs, deliveryCondition) => {
        const itemGroups = {
            happyhour: [],
            coupon: [],
            special: [],
            catering: [],
            favourite: []
        };

        const filterGroups = [];
        const itemsById = {};

        const fee = items.data.fee;
        const feeLabel = orderTypeToTxt(deliveryCondition.type, fee);

        (items.data.items || []).forEach(itemData => {
            const item = mapItems(itemData, null, favoriteIDs);

            itemsById[item.id] = item;

            addFilterGroup(item, filterGroups);

            if (item.special.remainingTime) {
                itemGroups.happyhour.push(item);
            } else if (item.special.voucher) {
                itemGroups.coupon.push(item);
            } else if (item.special.title) {
                itemGroups.special.push(item);
            }
            if (itemData.isFavorite) {
                itemGroups.favourite.push(item);
            }
            if (itemData.isCatering) {
                itemGroups.catering.push(item);
            }
        });

        const groups = [];
        if (itemGroups.happyhour.length) {
            groups.push({
                items: itemGroups.happyhour,
                type: "happyhour",
                title: "Happy Hour",
                subTitle: ""
            });
        }
        if (itemGroups.favourite.length) {
            groups.push({
                items: itemGroups.favourite,
                type: "favourite",
                title: "Your Favourites",
                subTitle: ""
            });
        }
        if (itemGroups.special.length) {
            groups.push({
                items: itemGroups.special,
                type: "special",
                title: "Special Offers",
                subTitle: ""
            });
        }
        if (itemGroups.coupon.length) {
            groups.push({
                items: itemGroups.coupon,
                type: "coupon",
                title: "Coupons",
                subTitle: ""
            });
        }
        if (itemGroups.catering.length) {
            groups.push({
                items: itemGroups.catering,
                type: "catering",
                title: "Catering",
                subTitle: ""
            });
        }

        const gatheredFilterGroups = gatherFilterGroups(filterGroups, itemsById);

        return produce(items, draft => {
            draft.data = {
                feeLabel: feeLabel,
                deliveryFee: fee,
                groups: groups.concat(gatheredFilterGroups)
            };
        });
    }
);

const addFilterGroup = (item, filters) => {
    addFilterIfNotExists("menuTitle", item.subTitle, item, filters);

    item.categories.forEach(category =>
        addFilterIfNotExists(category.searchType, category.text, item, filters)
    );
};

const addFilterIfNotExists = (type, value, item, filters) => {
    const filterIndex = getFilterIndex(type, value, filters);
    if (filterIndex !== -1) {
        filters[filterIndex].items.push(item);
    } else {
        filters.push({
            items: [item],
            type: type,
            title: value,
            subTitle: ""
        });
    }
};

const getFilterIndex = (type, value, filters) => {
    return filters.findIndex(
        filter => filter.type === type && filter.title === value
    );
};

const gatherFilterGroups = (filterGroups, itemsById) => {
    let group;
    let pureGroup;
    const gatheredGroups = [];
    const moreGroup = {
        items: [],
        type: 'more',
        title: 'More Food',
        subTitle: ""
    };


    for (let i = 0; i < filterGroups.length; i++) {
        group = filterGroups[i];
        if (group.items.length >= 3) {
            pureGroup = {
                items: [],
                type: group.type,
                title: group.title,
                subTitle: group.subTitle,
            };
            for (let j = 0; j < group.items.length; j++) {
                if (itemsById[group.items[j].id]) {
                    pureGroup.items.push(group.items[j]);
                    delete itemsById[group.items[j].id];
                }
            }
            gatheredGroups.push(pureGroup);
        }
    }

    for (const key in itemsById) {
        moreGroup.items.push(itemsById[key]);
    }

    if (moreGroup.items.length) {
        gatheredGroups.push(moreGroup);
    }

    return gatheredGroups;
};