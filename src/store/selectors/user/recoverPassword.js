import {
    createSelector
} from 'reselect';
import getStatus from "../functions/getFetchStatus";

export default createSelector(
    [
        state => state.user.passwordRecovery.recover,
    ],
    recover => transform(recover),
)




const transform = recover => {
    const data = transformData(recover.data);
    return {
        data: data,
        status: getStatus(recover.status)
    };
}


const transformData = data => data