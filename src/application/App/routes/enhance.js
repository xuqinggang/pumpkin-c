import { isHasCookie } from 'lib/util';
import { goLogin } from './routes';

// enhance 其实不是必要的 可以用以下方式替代
/**
 * <Route
 *  exact
 *  path={`${url}/input/:rentUnitId`}
 *  render={props => (
 *      isHasCookie('sid') ? (
 *          // berfore
 *          <CommentInput {...props} apartmentId={apartmentId} />
 *          // after
 *      ) : (
 *          <Redirect to={`${urlPrefix}/login`} />
 *      )
 *  )}
 * />
 */

export default {
    loginRequired: (history, to, next = () => null) => {
        // 跳转前判断是否登录，利用cookie中是否含有sid判断
        if (isHasCookie('sid')) {
            next();
        } else {
            goLogin(history)();
            next(false);
        }
    },
};
