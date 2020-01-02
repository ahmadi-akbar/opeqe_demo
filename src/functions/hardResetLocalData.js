import localForage from "localforage";

import {
    STORE_DB_CONFIG
} from '../store/redux-pwa';

export default () => {
    localForage.config(STORE_DB_CONFIG);

    localForage.clear(() => {
        window.location.reload();
    });

}