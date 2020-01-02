import {
    createSelector
} from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
    [
        state => state.user.passwordRecovery.sendCode,
    ],
    sendCode => transform(sendCode),
)




const transform = sendCode => {
    const data = transformData(sendCode.data);
    console.log(sendCode);
    return {
        data: data,
        status: getStatus(sendCode.status)
    };
}


const transformData = data => data