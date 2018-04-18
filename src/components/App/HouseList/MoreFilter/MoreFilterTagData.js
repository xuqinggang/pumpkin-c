// 朝向tags
const directionTagsArr = [
    {
        text: '东',
        value: 'EAST',
    },
    {
        text: '西',
        value: 'WEST',
    },
    {
        text: '南',
        value: 'SOUTH',
    },
    {
        text: '北',
        value: 'NORTH',
    },
    {
        text: '南北',
        value: 'NORTHSOUTH',
    },
];

// 特性标签tags
const featureTagsArr = [
    {
        text: '首次出租',
        value: 'FIRST_RENTAL',
    },
    {
        text: '集中供暖',
        value: 'CENTRALIZED_HEATER',
    },
    {
        text: '独立阳台',
        value: 'BALCONY',
    },
    {
        text: '免押金',
        value: 'DEPOSIT_FREE',
    },
    {
        text: '独立卫生间',
        value: 'BATHROOM',
    },
    {
        text: '独立供暖',
        value: 'INDIVIDUAL_HEATER',
    },
    {
        text: '随时入住',
        value: 'AVAILABLE',
    },
    {
        text: '集中式',
        value: 'CENTRALIZED',
    },
];

// 面积标签
const areaTagsArr = [
    {
        text: '20m²以下',
        value: { floor: null, ceil: 20 },
    },
    {
        text: '20-40m²',
        value: { floor: 20, ceil: 40 },
    },
    {
        text: '40-60m²',
        value: { floor: 40, ceil: 60 },
    },
    {
        text: '60m²以上',
        value: { floor: 60, ceil: null },
    },
];

// 楼层标签
const floorTagsArr = [
    {
        text: '6层以下',
        value: { ceil: 6 },
    },
    {
        text: '6-12层',
        value: { floor: 6, ceil: 12 },
    },
    {
        text: '12层以上',
        value: { floor: 12 },
    },
];

export default {
    directs: directionTagsArr,
    tags: featureTagsArr,
    areaInfo: areaTagsArr,
    floorInfo: floorTagsArr,
};
