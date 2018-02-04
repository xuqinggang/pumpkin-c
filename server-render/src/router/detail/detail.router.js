import Router from 'koa-router';
import ajaxInitHouseDetailData from 'application/App/HouseDetail/ajaxInitHouseDetail'

const router = new Router();

router.get('/:rentUnitId', async (ctx, next) => {
    const houseDetailData = await ajaxInitHouseDetailData(ctx.params.rentUnitId);
    ctx.state.title = houseDetailData && houseDetailData.houseProfileData &&houseDetailData.houseProfileData.title;

    window.setStore('houseDetail', {
        [ctx.params.rentUnitId]: houseDetailData
    });

    await next();
    // await  ctx.render('index')
    // console.log('detail.router')
    // const houseDetailData = await 123;
    // next();
});
export default router;
