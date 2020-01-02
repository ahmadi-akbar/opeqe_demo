import {
    sendPasswordRecoveryURL,
} from "../config/api";

import {
    appId,
    appType,
} from "../config/app";


export default function({
    phone
} = {}) {

    const body = {
        appId,
        appType,
        wireless: phone,
    };

    return {
        url: `${sendPasswordRecoveryURL}`,
        key: `${sendPasswordRecoveryURL}`,
        body,
        method: 'post',
    }
}