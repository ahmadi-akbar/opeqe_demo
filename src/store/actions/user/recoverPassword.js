import {
    RECOVER_PASSWORD
} from "../../config/actionNames";
import recoverPassword from "../../../api/user/recoverPassword";
import {
    addToQueue
} from "../../redux-pwa";


export default ({
    phone,
    newPass,
    recoveryCode
}) => (dispatch, getState) => {

    const dataForAPI = {
        phone,
        newPass,
        recoveryCode
    }

    dispatch(
        addToQueue({
                type: [RECOVER_PASSWORD],
            },
            recoverPassword(
                dataForAPI
            )
        )
    );
}