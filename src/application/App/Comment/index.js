import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

export default class Comment extends PureComponent {
    render() {
        const { url, params } = this.props.match;
        const { apartmentId } = params;

        return (
            <Switch>
                <Route
                    exact
                    path={`${url}/input/:rentUnitId`}
                    render={
                        props => (
                            <CommentInput {...props} apartmentId={apartmentId} />
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
                            <CommentList {...props} apartmentId={id} />
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

// useAge: withHistory(history)(createCommentInputPath)
export const createCommentInputPath = rentUnitId => `comment/${rentUnitId}/input`;

export const createCommentListPath = apartmentId => `comment/${apartmentId}/list`;
