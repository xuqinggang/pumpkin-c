import { postRouteChangeToIOSV2 } from 'lib/patchNavChangeInIOS';
import { queryStringToObject, generateUrl } from './utils';
import { isLikeNativeView } from 'lib/const';

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
        if (isLikeNativeView()) {
            postRouteChangeToIOSV2({ to: `${window.location.origin}${to}${window.location.search}`, title });
        }
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
            const [baseUrl, urlQs] = url.split('?');

            const a = queryStringToObject(urlQs || '');
            const b = queryStringToObject(search.split('?')[1]);

            const query = Object.assign({}, b, a);
            newUrl = generateUrl(baseUrl, query);
        } else {
            newUrl = url;
        }

        next(newUrl);
    },
};
