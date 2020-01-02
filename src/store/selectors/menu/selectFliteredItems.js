import produce from "immer";
import { createSelector } from "reselect";

import mapItems from "./functions/mapItems";

const filterType = (state, props) => props.filterTypes;

const filterValue = (state, props) =>
  props.filterValue ? props.filterValue.toLowerCase() : "";

const getMenu = state => state.menu.items;

export default () => {
  return createSelector(
    [filterType, filterValue, getMenu, state => state.menu.favoriteItems.data],
    (types, value, items, favoriteIDs) => {
      const outItems = [];
      (items.data.items || []).forEach((item, index) => {
        if (match(item, types, value)) {
          outItems.push(mapItems(item, null, favoriteIDs));
        }
      });

      return produce(items, draft => {
        draft.data = {
          items: outItems
        };
      });
    }
  );
};

const match = (item, types = [], value) => {
  let condition = true;
  for (let i = 0; i < types.length; i++) {
    switch (types[i]) {
      case "title":
        condition = condition && includes(item.title, value);
        break;
      case "cuisineTitle":
        condition = condition && includes(item.cuisineType.title, value);
        break;
      case "courseTitle":
        condition = condition && includes(item.courseType.title, value);
        break;
      case "mealTitle":
        condition = condition && includes(item.mealType.title, value);
        break;
      case "menuTitle":
        condition = condition && includes(item.menuType.title, value);
        break;
      case "catering":
        condition = condition && item.isCatering;
        break;
      default:
        break;
    }
    if (condition) {
      return true;
    }
  }

  return false;
};

const includes = (str, search) => str.toLowerCase().includes(search);
