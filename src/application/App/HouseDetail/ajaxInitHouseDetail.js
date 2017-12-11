import Service from 'lib/Service';
import HouseDetailMap from './HouseDetailMap';

export default function ajaxInitHouseDetail() {
    return Service.get('/v1/rentUnits/21')
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

                // 经纬度
                lon,
                lat,
            } = houseDetailData;

            // RoomSlider轮播图数据和家具轮播数据
            const { sliderImgArr, furnitureSliderArrData } = genRoomSlider(houseDetailData);

            // HouseProfile数据组织
            const houseProfileData = genHouseProfile(houseDetailData);

            // HouseTags数据
            const houseTagsArrData = genHouseTags(houseDetailData);

            // HouseBrief数据
            const houseBriefArrData = genHouseBrief(houseDetailData);

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

            console.log('sliderImgArr', sliderImgArr, houseProfileData, communityIntroData);

            return {
                sliderImgArr,
                furnitureSliderArrData,
                houseProfileData,
                houseTagsArrData,
                houseBriefArrData,
                // HouseIntro房源介绍相关信息
                houseIntroStr: intro,
                apartmentIntroData,
                // RoommateInfo室友相关信息
                roomateInfoArrData: roomMates,
                communityIntroData,
                contactButlerData,
                houseTrafficData,
            };
        });
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
        propertyType: propertyType || '暂无',
        greenRate: greenRate ? `${greenRate}%` : '暂无',
        openYear: openYear || '暂无',
    };
}

function genApartmentIntro(houseDetailData) {
    return houseDetailData.apartment;
}

function genHouseProfile(houseDetailData) {
    const {
        rentalType = 'SHARED',
        apartment,
        bedroomCount,
        livingRoomCount,
        // 区域
        districtName,
        // 小区
        blockName,
        subwayLine = 'xxx',
        subwayStation = 'xxx',
        subwayDistance = 'xxx',
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
                price: pricePay || 'xxx',
                deposit: houseDetailData[`deposit${payType}`] || 'xxx',
            };
        }
    });

    // title location ------------
    const title = `${HouseDetailMap[rentalType]}·${blockName}${bedroomCount}卧${livingRoomCount}厅`;
    const location = `${districtName}-${blockName}-距${subwayLine}${subwayStation}站${subwayDistance}米`;

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
        return HouseDetailMap[tag];
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

    return [`${area}m²`, `${bedroomCount}卧${livingRoomCount}厅`, `${floor}/${totalFloor}层`, `${HouseDetailMap[direct]}`];
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
    }
    stuffData(livingRooms, '客厅');
    stuffData(bathrooms, '卫生间');
    stuffData(kitchens, '厨房');

    // 向家具轮播填充数据 
    function stuffRoomFurniture(text, furniture = []) {
        furnitureSliderArrData.push({
            text,
            furniture,
        });
    }

    // 填充数据
    function stuffData(rooms, roomType) {
        const roomsLength = rooms && rooms.length;
        if (roomsLength) {
            rooms.forEach((room, index) => {
                // room text
                let text = roomType;
                // 某种房屋类型存在多个room时，添加room序号
                if (roomsLength > 1) {
                    text = `0${room.number}${text}`;
                }

                // 生成房间的furniture
                // room存在furniture才push
                if (room.furniture && room.furniture.length) {
                    stuffRoomFurniture(text, room.furniture);
                }

                // 轮播图Item信息
                const sliderImgItem = {
                    text,
                    // 累计该item前所有item的img和
                    aboveImgLength,
                };

                let imgInfo = [];
                const roomImages = room.images;
                if (roomImages && roomImages.length) {
                    imgInfo = roomImages.map((imageUrl, index) => {
                        aboveImgLength++;
                        return {
                            img: imageUrl,
                            activeIndex,
                        };
                    });
                }
                sliderImgItem.imgInfo = imgInfo;

                // push
                sliderImgArr.push(sliderImgItem);
                activeIndex++; 
            });
        }
    }

    return {
        sliderImgArr,
        furnitureSliderArrData,
    };
}
