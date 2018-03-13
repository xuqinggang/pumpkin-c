import { isString, isNumber } from 'lib/util';
import { DirectTypeMapText } from 'baseData/MapData';

export const getTitle = (bedroomCount, livingRoomCount, name) => {
    let title = '';
    if (isNumber(bedroomCount)) {
        title = `${title}${bedroomCount}室`;
    }

    if (isNumber(livingRoomCount)) {
        title = `${title}${livingRoomCount}厅`;
    }

    if (isString(name) && name !== '') {
        title = `${title} ・ ${name}`;
    }

    return title;
};

export const getFloors = (floor, totalFloor) => {
    if (!totalFloor) {
        return '';
    }

    let floors = '';
    if (floor) {
        floors = `${floors}${floor}/`;
    }

    floors = `${floors}${totalFloor}层`;

    return floors;
};

export const getDirect = (direct) => {
    if (!direct) {
        return '';
    }

    if (direct === 'MULTI') {
        return '多个朝向';
    }

    return DirectTypeMapText[direct];
};