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
        postRouteChangeToIOSV2({ to: `${window.location.origin}${to}${window.location.search}`, title });
        next();
    },
    pv: (history, url, next) => {
        // 焦点pv请求
        window.send_stat_pv && window.send_stat_pv();
        next();
    },
    withSearch: (history, url, next) => {
        const { search } = window.location;

        let newUrl;
        if (search) {
            newUrl = url.indexOf('?') > -1 ? url + '&' + search.slice(1) : url + search;
        } else {
            newUrl = url;
        }
        next(newUrl);
    },
};
