import { SUBMIT_SHOPPING_CART } from "../../config/actionNames";
import submitCart from "../../../api/cart/submitCart";
import formatDate from "../../../api/functions/formatData";
import { addToQueue } from "../../redux-pwa";
import addAuth from "../helpers/addAuth";
import uuid from "../../../functions/uuid";
import getDate from "../../../functions/formattedDate";
import getCheckOutData from "../../selectors/cart/getCheckOutData";
import getDeliveryData from "../../selectors/user/getDeliveryData";
import selectDefaultPaymentMethod from "../../selectors/user/selectDefaultPaymentMethod";

export default note => async (dispatch, getState) => {
  const state = getState();

  const checkoutData = getCheckOutData(state);
  const deliveryData = getDeliveryData(state);
  const defaultPayment = selectDefaultPaymentMethod(state);

  const checkOut = {
    data: {
      id: uuid(),
      paymentId: defaultPayment.id,
      note: note,
      gratuity: 0,
      date: cerateFormattedDate(),
      delivery: deliveryData,
      ...checkoutData
    }
  };

  dispatch(
    addToQueue(
      {
        type: [SUBMIT_SHOPPING_CART]
      },
      submitCart(addAuth(checkOut, state))
    )
  );
};

const cerateFormattedDate = () => {
  const { hour12, minute, year, monthName, meridiem, day } = getDate();

  return formatDate({
    monthName,
    day,
    year,
    hour12,
    minute,
    meridiem
  });
};
