'use strict';

import ajaxInitHouseDetailData from 'application/App/HouseDetail/ajaxInitHouseDetail'

export default async (ctx, next) => {
    const houseDetailData = await ajaxInitHouseDetailData(ctx.params.rentUnitId);
    const { title, description, keywords } = houseDetailData.seoData;
    ctx.state.title = title;
    ctx.state.description = description;
    ctx.state.keywords = keywords;

    window.setStore('houseDetail', {
        [ctx.params.rentUnitId]: houseDetailData
    });

    await next();
}
