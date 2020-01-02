import {
    createSelector
} from 'reselect';
import produce from "immer";

export default createSelector(
    [
        state => state.menu.items,
    ],
    items => {
        const promoItems = [];

        (items.data.items || []).forEach(({
            id,
            special,
            image,
            cuisineType: {
                title: cuisine
            },
            courseType: {
                title: course
            },
            mealType: {
                title: meal
            },
        }) => {
            const item = {
                id: id,
                image: image,
                title: special.title.trim().replace(/^use /i, ''),
                subTitle: special.description,
                description: special.policy,
                cuisine,
                course,
                meal
            };


            if (special.title) {
                promoItems.push(item);
            }
        });

        return produce(items, draft => {
            draft.data = promoItems;
        });
    },
);