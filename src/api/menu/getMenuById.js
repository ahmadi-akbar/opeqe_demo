import {
    getMenuByIdURL,
} from "../config/api";

import {
    appId,
    appType,
} from "../config/app";

import {
    locationId,
} from "../config/store";


export default function({
    id,
    latitude,
    longitude,
    altitude,
    distance,
    floor,
    token,
    deviceId,
    messageToken,
} = {}) {

    const body = {
        Apptype: appType,
        AppId: appId,
        MenuId: id,
        LocationId: locationId,
        Latitude: latitude,
        Longitude: longitude,
        Altitude: altitude,
        Distance: distance,
        Floor: floor,
        DeviceId: deviceId,
        MessageToken: messageToken,
    }


    return {
        url: getMenuByIdURL,
        key: getMenuByIdURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
        method: 'post',
    }
}