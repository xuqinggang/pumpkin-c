import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router';

import withHistory from 'application/App/routes/utils';
import { loginRequired } from 'application/App/routes/enhance';
import { isHasCookie } from 'lib/util';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

class Comment extends PureComponent {
    render() {
        const { match } = this.props;
        const { url, params } = match;
        const { apartmentId } = params;

        const { urlPrefix } = window.customStore.url;

        return (
            <Switch>
                <Route
                    exact
                    path={`${url}/input/:rentUnitId`}
                    render={props => (
                        isHasCookie('sid') ? (
                            <CommentInput {...props} apartmentId={apartmentId} />
                        ) : (
                            <Redirect to={`${urlPrefix}/login`} />
                        )
                    )}
                />
                <Route
                    exact
                    path={`${url}/list`}
                    render={
                        props => (
                            <CommentList {...props} apartmentId={apartmentId} />
                        )}
                />
                <Route
                    exact
                    path={`${url}`}
                    render={
                        props => (
                            <CommentList {...props} apartmentId={apartmentId} />
                        )}
                />
            </Switch>
        );
    }
}

Comment.propTypes = {
    match: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }).isRequired,
};

export default Comment;

export const createCommentInputPath = (apartmentId, rentUnitId) => `comment/${apartmentId}/input/${rentUnitId}`;
export const createCommentListPath = apartmentId => `comment/${apartmentId}/list`;

export const goCommentInput = withHistory(createCommentInputPath, {
    beforeRouteChange: loginRequired,
});

export const goCommentList = withHistory(createCommentListPath);
