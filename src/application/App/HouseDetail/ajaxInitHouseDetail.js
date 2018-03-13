import Service from 'lib/Service';
import  { getWithDefault } from 'lib/util';
import { RentalTypeMapText, DirectTypeMapText, TagTypeMapText, ApartmentType } from 'baseData/MapData';

// 收藏房源
export function ajaxCollectHouse(rentUnitId) {
    return Service.post(`/api/v1/rentUnits/${rentUnitId}/collections`)
        .then((data) => {
            if (data.code === 200) {
                return true;
            }

            throw new Error(data);
        })
}

// 取消收藏
export function ajaxCancelCollectHouse(rentUnitId) {
    return Service.delete(`/api/v1/rentUnits/${rentUnitId}/collections`)
        .then((data) => {
            if (data.code === 200) {
                return true;
            }

            throw new Error(data);
        })
}

// 举报房源
export function ajaxHouseReport(rentUnitId, paramsObj) {
    return Service.post(`/api/v1/rentUnits/${rentUnitId}/reports`, paramsObj)
        .then((data) => {
            if (data.code === 200) {
                return true;
            }

            throw new Error(data);
        })
}

export default function ajaxInitHouseDetailData(rentUnitId) {
    // if (rentUnitId == undefined) { return; }
    return Service.get(`/api/v1/rentUnits/${rentUnitId}`)
        .then((data) => {
            if (200 !== data.code) {
                return;
            }

            const houseDetailData = data.data;

            const {
                // 房源介绍
                intro,

                // 室友相关信息
                roomMates,

                // 出租类型
                rentalType,

                // 经纬度
                lon,
                lat,

                // 是否收藏（登录下）
                isCollected,

                // 集中式公寓
                aptType,
                onsaleCount,
            } = houseDetailData;


            // RoomSlider轮播图数据和家具轮播数据
            const { sliderImgArr, furnitureSliderArrData } = genRoomSlider(houseDetailData);

            // HouseProfile数据组织
            const houseProfileData = genHouseProfile(houseDetailData);

            // HouseTags数据
            const houseTagsArrData = genHouseTags(houseDetailData);

            // HouseBrief数据
            const houseBriefData = genHouseBrief(houseDetailData);

            // ApartmentIntro公寓相关信息
            const apartmentIntroData = genApartmentIntro(houseDetailData);

            // CommunityIntro小区相关信息
            const communityIntroData = genCommunityIntro(houseDetailData);

            // ContactButler管家信息
            const contactButlerData = genContactButler(houseDetailData);

            // HouseTraffic周边及交通 经纬度
            const houseTrafficData = {
                lon,
                lat,
            };

            // 服务器端渲染seo相关数据
            const seoData = genSeoData(houseDetailData);

            return {
                headData: { isCollected, },
                sliderImgArr,
                furnitureSliderArrData,
                houseProfileData,
                houseTagsArrData,
                houseBriefData,
                // HouseIntro房源介绍相关信息
                houseIntroStr: intro,
                apartmentIntroData,
                // RoommateInfo室友相关信息
                roomateInfoArrData: roomMates,
                communityIntroData,
                contactButlerData,
                houseTrafficData,
                extraData: {
                    rentalType,
                    aptType,
                    onsaleCount,
                },
                seoData,
            };
        })
        .catch((err) => {
            console.log('err', err);
            return {};
        })
}

function genSeoData(houseDetailData) {
    const {
        // 合租(SHARED)整租(WHOLE)
        rentalType = 'SHARED',
        bedroomCount,
        livingRoomCount,
        // 区域
        districtName = '',
        // 小区
        blockName = '',
        subwayLine = '',
        subwayStation = '',
        subwayDistance = '',
    } = houseDetailData;

    let title = '',
        keywords = '',
        description = '';

    const houseDetailTitle = `${RentalTypeMapText[rentalType]}·${blockName}${bedroomCount}室${livingRoomCount}厅`;

    title = `${houseDetailTitle}-南瓜租房北京租房`;
    keywords = `北京${districtName}${blockName}租房,${subwayLine}${subwayStation}租房,品质租房${houseDetailTitle}`;
    description = `北京南瓜租房提供${houseDetailTitle},距${subwayLine}${subwayStation}${subwayDistance}米`;

    return {
        title,
        keywords,
        description,
    };
}
function genContactButler(houseDetailData) {
    const {
        superName,
        superTel,
        superHeadImg,
    } = houseDetailData;

    return {
        name: superName,
        img: superHeadImg,
        tel: superTel,
    };
}

function genCommunityIntro(houseDetailData) {
    const {
        constructType,
        propertyType,
        greenRate,
        openYear,
    } = houseDetailData;

    return {
        constructType: constructType || '暂无',
        greenRate: greenRate ? `${greenRate}%` : '暂无',
        openYear: openYear || '暂无',
        propertyType: propertyType || '暂无',
    };
}

function genApartmentIntro(houseDetailData) {
    return houseDetailData.apartment;
}

function genHouseProfile(houseDetailData) {
    const {
        // 合租(SHARED)整租(WHOLE)
        rentalType = 'SHARED',
        apartment,
        bedroomCount,
        livingRoomCount,
        // 区域
        districtName,
        // 小区
        blockName,
        bedrooms,
        subwayLine,
        subwayStation,
        subwayDistance,
        aptType,
        name,
    } = houseDetailData;

    // 付款方式数据组织, 公寓名称-----------
    const payTypeArr = ['Month', 'Season', 'HalfYear', 'Year'];
    const payTypeData = {};

    // 当前展示的付款方式，为价钱最低的
    let maxPrice = 99999;
    let selectedPayType = null;

    payTypeArr.forEach((payType, index) => {
        const pricePay = houseDetailData[`price${payType}`]
        if (pricePay) {
            if (pricePay < maxPrice) {
                selectedPayType = payType;
                maxPrice = pricePay;
            }

            payTypeData[payType] = {
                price: pricePay,
                deposit: houseDetailData[`deposit${payType}`],
            };
        }
    });

    // title location ------------
    let title = `${RentalTypeMapText[rentalType]}·${blockName}${bedroomCount}室${livingRoomCount}厅`;

    // title is different when aptType is 
    if (aptType === ApartmentType.CENTRALIZED) {
        title = `${RentalTypeMapText[rentalType]}·${bedroomCount}室${livingRoomCount}厅 (${name})`;
    }

    let location = `${districtName}-${blockName}`;
    if (subwayLine != null && subwayDistance != null && subwayStation != null) {
        location = `${location}-距${subwayLine}${subwayStation}${subwayDistance}米`;
    }

    // 合租的话，标题添加 '-01卧室'
    if (rentalType === 'SHARED') {
        const number = (bedrooms && bedrooms[0].number) || 0;
        title = `${title}·0${number}卧室`;
    }

    // return
    return {
        title,
        location,
        houseProfileHeadData: {
            payTypeData,
            selectedPayType,
            apartmentName: apartment && apartment.name,
        }
    }
}

function genHouseTags(houseDetailData) {
    const { tags } = houseDetailData;
    if (!tags || 0 === tags.length) return [];

    return tags.map((tag) => {
        return TagTypeMapText[tag];
    });
}

function genHouseBrief(houseDetailData) {
    const {
        area,
        floor,
        totalFloor,
        direct,
        bedroomCount,
        livingRoomCount,
    } = houseDetailData;

    const directText = getWithDefault(DirectTypeMapText, direct, '多个朝向');

    return {
        area,
        bedroomCount,
        livingRoomCount,
        floor,
        totalFloor,
        direct: directText,
    };
}

function genRoomSlider(houseDetailData) {
    // sliderImgArr数组第一级元素的位置是当前activeIndex的值
    let activeIndex = 0;
    // 累加图片元素个数
    let aboveImgLength = 0;
    // 头部照片轮播
    const sliderImgArr = [];
    // 家具轮播
    const furnitureSliderArrData = [];
    const bedrooms = houseDetailData.bedrooms;
    const livingRooms = houseDetailData.livingRooms;
    const bathrooms = houseDetailData.bathrooms;
    const kitchens = houseDetailData.kitchens;
    const othersRooms = houseDetailData.othersRooms;

    // 公共空间家具
    const publicFurniture = houseDetailData.publicFurniture;

    // 向公共空间，填充家具
    stuffRoomFurniture('公共空间', publicFurniture);


    // 顺序: 卧室 户型图 客厅 卫生间 厨房
    stuffData(bedrooms, '卧');

    // 户型图
    if (houseDetailData.houseTypeImg) {
        sliderImgArr.push(
            {
                text: '户型图',
                imgInfo: [
                    {
                        img: houseDetailData.houseTypeImg,
                        activeIndex,
                    },
                ],
                aboveImgLength,
            },
        );

        aboveImgLength++;
        activeIndex++;
    }

    stuffData(livingRooms, '客厅');
    stuffData(bathrooms, '卫生间');
    stuffData(kitchens, '厨房');
    stuffData(othersRooms, '更多');

    return {
        sliderImgArr,
        furnitureSliderArrData,
    };

    // 向家具轮播填充数据
    function stuffRoomFurniture(text, furniture = []) {
        if (furniture.length) {
            furnitureSliderArrData.push({
                text,
                furniture,
            });
        }
    }

    // 卫生间，如果存在多个卫生间，则将卫生间合并，且最多五张图片
    // 并将多个卫生间的家具合并
    function stuffBathRoomsData(rooms, roomType) {
        const MAXCOUNT = 5;
        let imgCount = 0;
        const roomsLength = rooms && rooms.length;
        const bathRoomFurnitureArr = [];
        if (roomsLength) {
            // room text
            let text = roomType;

            // 轮播图Item信息
            const sliderImgItem = {
                text,
                // 累计该item前所有item的img和
                aboveImgLength,
            };
            let imgInfo = [];

            rooms.forEach((room, index) => {
                const roomImages = room.images;

                if (roomImages && roomImages.length) {
                    roomImages.forEach((imageUrl, index) => {
                        if (imgCount >= MAXCOUNT) { return; }
                        aboveImgLength++;
                        imgCount++;

                        imgInfo.push({
                            img: imageUrl,
                            activeIndex,
                        });
                    });
                }
            });

            sliderImgItem.imgInfo = imgInfo;
            sliderImgArr.push(sliderImgItem);
            activeIndex++;
        }
    }

    // 填充数据
    function stuffData(rooms, roomType) {
        const roomsLength = rooms && rooms.length;
        if (roomsLength) {
            rooms.forEach((room, index) => {
                const roomImages = room.images;
                if (roomImages && roomImages.length === 0) return;
                // room text
                let text = roomType;

                // 某种房屋类型存在多个room时，添加room序号
                if (roomsLength > 1) {
                    text = `0${room.number}${text}`;
                } else if (roomType === '卧' && roomsLength === 1) {
                    text = `${text}室`;
                }

                // 生成房间的furniture
                // room存在furniture才push，只有卧室填充家具
                if (roomType === '卧' && room.furniture && room.furniture.length) {
                    stuffRoomFurniture(text, room.furniture);
                }

                // 轮播图Item信息
                const sliderImgItem = {
                    text,
                    // 累计该item前所有item的img和
                    aboveImgLength,
                };

                let imgInfo = [];
                imgInfo = roomImages.map((imageUrl, index) => {
                    aboveImgLength++;
                    return {
                        img: imageUrl,
                        activeIndex,
                    };
                });
                sliderImgItem.imgInfo = imgInfo;

                // push
                sliderImgArr.push(sliderImgItem);
                activeIndex++;
            });
        }
    }
}
