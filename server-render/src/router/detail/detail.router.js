import Router from 'koa-router';
// import ajaxInitHouseDetailData from 'application/App/HouseDetail/ajaxInitHouseDetail'
const router = new Router();
router.get('/:rentUnitId', async (ctx, next) => {
    // const houseDetailData = await ajaxInitHouseDetailData(ctx.params.rentUnitId);
    // console.log('dat', houseDetailData);
    // window.setStore('houseDetail', {
    //     [ctx.params.rentUnitId]: houseDetailData
    // });
    next();
  await  ctx.render('index')
// console.log('detail.router')
//     const houseDetailData = await 123;
//     next();
});
export default router;
