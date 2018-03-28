import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

export default class Comment extends PureComponent {
    render() {
        const { url } = this.props.match;

        return (
            <Switch>
                <Route exact path={`${url}/input`} component={CommentInput} />
                <Route exact path={`${url}/list`} component={CommentList} />
                <Route exact path={`${url}`} component={CommentList} />
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
