import withHistory from 'application/App/routes/utils';

const createLoginPath = () => '/login';
const goLogin = withHistory(createLoginPath);

export {
    goLogin,
};
