export const HOME_PAGE_URL = () => "";

export const SIGN_UP_PAGE_URL = () => "login";
export const LOG_IN_PAGE_URL = () => "login";

export const ITEM_INSTRUCTIONS_PAGE_URL = ({
  cuisine,
  meal,
  course,
  id
} = {}) => {
  if (!cuisine || !meal || !course || !id) {
    return "menu/:cuisine/:meal/:course/:id";
  }

  return `menu/${cuisine}/${meal}/${course}/${id}`;
};

export const ITEM_INSTRUCTIONS_URL_PARAMS = ({
  cuisine,
  meal,
  course,
  id
} = {}) => {
  return `cuisine=${cuisine}&meal=${meal}&course=${course}&itemId=${id}`;
};

export const SHOPPING_CART_PAGE_URL = () => "cart";
export const ORDER_HISTORY_PAGE_URL = () => "order-history";
export const ORDER_HISTORY_RECENT_PAGE_URL = () =>
  ORDER_HISTORY_PAGE_URL() + "/recent";

export const ITEM_SEARCH_PAGE_URL = ({ filterTypes, filterValue } = {}) => {
  if (!filterValue) {
    return "search/:filterType/:filterValue";
  }

  return `search/${filterTypes[0]}/${filterValue}`;
};

export const ORDER_OPTIONS_PAGE_URL = () => "order-options";

export const RESERVATION_LIST_PAGE_URL = () => "reservation";
export const RESERVATION_OPTIONS_PAGE_URL = () =>
  `${RESERVATION_LIST_PAGE_URL()}/new`;
export const RESERVATION_DETAILS_PAGE_URL = ({ isWait } = {}) => {
  let out = `${RESERVATION_OPTIONS_PAGE_URL()}/details`;
  if (isWait) {
    out += "?type=waitlist";
  }
  return out;
};

export const PROFILE_PAGE_URL = () => "profile";
export const PROFILE_PAYMENT_LIST_PAGE_URL = () =>
  PROFILE_PAGE_URL() + "/payment";
export const PROFILE_PROMO_PAGE_URL = () => PROFILE_PAGE_URL() + "/promo";
export const PROFILE_INVITE_PAGE_URL = () => PROFILE_PAGE_URL() + "/invite";

export const BANNED_PAGE_URL = () => "banned";
