import produce from "immer";

import calculateSpecial from "./calculateSpecial";
import mapInstructions from "./mapInstructions";

export default ({
        title,
        subTitle,
        cuisineType: {
            title: cuisine
        },
        courseType: {
            title: course
        },
        mealType: {
            title: meal
        },
        menuType: {
            title: menu
        },
        price,
        special,
        image,
        id,
        preparation,
        isFavorite,
        beginTime
    },
    instructions,
    favoriteIDs = {}
) => {
    const mappedInstructions = instructions ? mapInstructions(instructions) : null;

    const itemData = {
        title: title,
        subTitle: menu,
        description: subTitle,
        categories: [{
                text: cuisine,
                type: "cuisine",
                searchType: "cuisineTitle"
            },
            {
                text: course,
                type: "course",
                searchType: "courseTitle"
            }
        ],
        cuisine,
        course,
        meal,
        menu,
        image,
        price,
        id,
        preparation: preparation,
        timeEstimate: [preparation, parseInt(1.5 * preparation)],
        special,
        instructions: mappedInstructions
    };

    const calculatedSpecial = calculateSpecial(special);

    return produce(itemData, draft => {
        draft.special = calculatedSpecial;
        draft.isFav = favoriteIDs[id];
    });
};