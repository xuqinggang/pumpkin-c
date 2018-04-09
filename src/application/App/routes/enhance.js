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
    pv: (history, url, next) => {
        // 焦点pv请求
        window.send_stat_pv && window.send_stat_pv();
        next();
    },
};
