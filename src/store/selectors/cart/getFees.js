import getDeliveryFee from "./getDeliveryFee";
import getServiceFee from "./getServiceFee";

export default (totalFee, totalQuantity, totalPrice) => {

    return {
        delivery: getDeliveryFee(totalQuantity, totalFee),
        service: getServiceFee(totalPrice),
    }
}