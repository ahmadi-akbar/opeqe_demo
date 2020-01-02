import {
    SEND_PASSWORD_RECOVERY
} from "../../config/actionNames";
import sendPasswordRecovery from "../../../api/user/sendPasswordRecovery";
import {
    addToQueue
} from "../../redux-pwa";


export default ({
    phone
}) => (dispatch, getState) => {

    const dataForAPI = {
        phone
    }

    dispatch(
        addToQueue({
                type: [SEND_PASSWORD_RECOVERY],
            },
            sendPasswordRecovery(
                dataForAPI
            )
        )
    );
}