import {
    fetchUserRewardsURL,
} from "../config/api";

import {
    appId,
} from "../config/app";
import {
    locationId
} from "../config/store";

export default function({
    token,
    ...data
} = {}) {

    const body = {
        AppId: appId,
        LocationId: locationId,
        ...data,
    };

    return {
        url: `${fetchUserRewardsURL}`,
        key: `${fetchUserRewardsURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
        method: 'post',
    }
}