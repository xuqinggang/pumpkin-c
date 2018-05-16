import { fork, call, takeLatest, take, put, select } from 'redux-saga/effects';

import { locationSagaActions, locationPutActions } from './LocationRedux';
import { dynamicScript, checkVarInterval } from 'lib/util';
import { CityeTextMapAbbrev } from 'const/city';

function locateCity() {
    return new Promise((resolve) => {
        dynamicScript('//webapi.amap.com/maps?v=1.4.2&key=2b979fbadc2bbafb74d58fec71a9f98a&plugin=AMap.CitySearch',
            () => {
                checkVarInterval('AMap.CitySearch')
                    .then(() => {
                        // eslint-disable-next-line
                        const citysearch = new AMap.CitySearch();
                        citysearch.getLocalCity((status, result) => {
                            if (status === 'complete' && result.info === 'OK') {
                                if (result && result.city && result.bounds) {
                                    const cityText = result.city.slice(0, -1);
                                    const cityAbbrev = CityeTextMapAbbrev[cityText];
                                    resolve(cityAbbrev);
                                }
                            }
                        });
                    });
            });
    });
}

function locateLngLat() {
    return new Promise((resolve) => {
        dynamicScript('//webapi.amap.com/maps?v=1.4.2&key=2b979fbadc2bbafb74d58fec71a9f98a&plugin=AMap.Geolocation',
            () => {
                checkVarInterval('AMap.Geolocation')
                    .then(() => {
                        // eslint-disable-next-line
                        const geolocation = new AMap.Geolocation({
                            enableHighAccuracy: true,
                            timeout: 10000,
                        });
                        geolocation.getCurrentPosition((status, result) => {
                            if (status === 'complete' && result.info === 'SUCCESS') {
                                const position = result.position;
                                if (position) {
                                    resolve([position.lng, position.lat]);
                                }
                            }
                        });
                    });
            });
    });
}

export function* watcherLocateCity() {
    yield take(locationSagaActions.LOCATION_CITY);
    yield put(locationPutActions.locationAdd({ isLocating: true }));
    const locCity = yield locateCity();
    yield put(locationPutActions.locationAdd({ isLocating: false, locCity }));
}

export function* watcherLocateLngLat() {
    while (true) {
        yield take(locationSagaActions.LOCATION_LNGLAT);
        const lnglat = yield locateLngLat();
        yield put(locationPutActions.locationAdd({ lnglat }));
    }
}

const locationSagas = [
    fork(watcherLocateCity),
    fork(watcherLocateLngLat),
];

export default locationSagas;
