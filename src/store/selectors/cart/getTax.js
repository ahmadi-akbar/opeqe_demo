import {
    taxRate
} from "../../config/store";

export default price => {
    return price * taxRate;
}