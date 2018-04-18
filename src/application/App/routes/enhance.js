import { postRouteChangeToIOSV2 } from 'lib/patchNavChangeInIOS';

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
    routeChangeToIOS: (history, to, next, title) => {
        postRouteChangeToIOSV2({ to, title });
        next();
    },
    pv: (history, url, next) => {
        // 焦点pv请求
        window.send_stat_pv && window.send_stat_pv();
        next();
    },
};
