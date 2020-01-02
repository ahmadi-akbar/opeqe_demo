import produce from 'immer';

import {
    DATA_FETCH_FULFILLED,
    SEND_PASSWORD_RECOVERY,
    RECOVER_PASSWORD
} from "../../config/actionNames";

import dataFetchStatusReducer, {
    initialFetchStatus
} from "../helpers/dataFetchStatus";

export const initialState = {
    sendCode: {
        status: initialFetchStatus,
        data: {},
    },
    recover: {
        status: initialFetchStatus,
        data: {},
    },
}


export default (state = initialState, action) => {

    const {
        sendCode: {
            status: prevSendCodeStatus
        },
        recover: {
            status: prevRecoverStatus
        },
    } = state;

    const sendCodeStatus = dataFetchStatusReducer(prevSendCodeStatus, action, SEND_PASSWORD_RECOVERY);
    const recoverStatus = dataFetchStatusReducer(prevRecoverStatus, action, RECOVER_PASSWORD);

    return produce(state, finalState => {
        finalState.sendCode.status = sendCodeStatus;
        finalState.recover.status = recoverStatus;

        const {
            type,
            payload
        } = action;

        switch (type) {
            // SEND RECOVERY
            case `${SEND_PASSWORD_RECOVERY}${DATA_FETCH_FULFILLED}`:
                {
                    finalState.sendCode.data = payload;
                    break;
                }
                // CONFIRM RECOVERY
            case `${RECOVER_PASSWORD}${DATA_FETCH_FULFILLED}`:
                {
                    finalState.recover.data = payload;
                    break;
                }
            default:
                {
                    break;
                }
        }

        return finalState;
    })

}