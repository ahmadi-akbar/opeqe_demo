import {
    recoverPasswordURL,
} from "../config/api";

import {
    appId,
    appType,
} from "../config/app";


export default function({
    phone,
    newPass,
    recoveryCode
} = {}) {

    const body = {
        appId,
        appType,
        number: phone,
        new: newPass,
        verification: recoveryCode
    };

    return {
        url: `${recoverPasswordURL}`,
        key: `${recoverPasswordURL}`,
        body,
        method: 'post',
    }
}