import withHistory from 'application/App/routes/utils';

const createShopListPath = () => '/shop/list';

const goShopList = withHistory(createShopListPath);

export {
    goShopList,
}
