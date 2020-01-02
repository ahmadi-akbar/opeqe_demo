export const domain = "https://opeqe.io/api/";

export const checkIfEmailIsDemoURl = domain + "auth/demo";

export const checkIfNewUserURL = domain + "auth/login/duplicate";
export const checkDuplicateCodeURL = domain + "web/auth/confirmation"
export const userLoginURL = domain + "auth/login";
export const userSignUpURL = domain + "auth/register";
export const fetchUserPaymentMethodsURL = domain + "app/profile/payments";
export const addUserPaymentMethodURL = domain + "app/profile/payment";
export const editUserPaymentMethodURL = domain + "app/profile/payment/edit";
export const fetchUserRewardsURL = domain + "app/rewards";
export const editUserNameURL = domain + "app/profile/name";
export const editUserPasswordURL = domain + "app/profile/password";
export const editUserEmailURL = domain + "app/profile/email";
export const verifyUserEmailURL = domain + "app/profile/email/verify";
export const fetchUserReferralURL = domain + "v-one/app/referral";
export const sendPasswordRecoveryURL = domain + "app/auth/password/reset";
export const recoverPasswordURL = domain + "app/auth/password/recovery";
export const loginWrongPass = "Password is incorrect";
export const loginUserNotFound = "User Not Found";
export const loginStoreNotFound = "Business Not Found";
export const storeBanCode = 205;
export const userBanCode = 206;
export const duplicateNewUser = 202;
export const duplicateExistingUser = 200;

export const getUserAddressURL = domain + "app/user/address";
export const setUserAddressURL = domain + "user/address";

export const getMenuURL = domain + "v-one/app/listmenu";
export const getMenuInstructionURL = domain + "v-one/app/menu/instruction";
export const getMenuByIdURL = domain + "v-one/web/menu/instruction";
export const addToFavoriteURL = domain + "app/profile/favorite";
export const removeFromFavoriteURL = domain + "app/profile/favorite/delete";

export const submitShoppingCartURL = domain + 'app/order';
export const fetchOrderHistoryURL = domain + "app/order/history";
export const cancelOrderURL = domain + "app/order/delete";

export const googleMapsAPIKey = "AIzaSyAL4TYcScp8aUIeeOwJsWfjA84FO7QUSxo";
export const mapsAPIDomain = 'https://maps.googleapis.com/maps/api/';
export const getDistanceURL = mapsAPIDomain + 'distancematrix/json?key=' + googleMapsAPIKey;

export const getCalendarEventsURL = domain + "app/reserve/event";

export const addReserveURL = domain + "app/reserve";
export const checkReserveAvailabilityURL = domain + "app/reserve/validation";
export const getReserveHistoryURL = domain + "app/reserve/history";
export const canselReserveURL = domain + "app/reserve/delete";