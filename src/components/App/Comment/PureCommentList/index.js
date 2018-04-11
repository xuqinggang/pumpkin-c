import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CommentItem from '../CommentItem';
import './styles.less';

const classPrefix = 'm-purecommentlist';

export default class PureCommentList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { comments } = this.props;

        if (comments.length === 0) {
            return (
                <div className={`${classPrefix}-empty g-grid-col f-flex-align-center`}>
                    <img src={require('./images/comment-empty.png')} alt="" />
                    <p className="no-comment">暂无评价</p>
                </div>
            );
        }

        return (
            <div className={`${classPrefix}`}>
                {
                    comments.map((comment, index) => (
                        <CommentItem comment={comment} key={index} />
                    ))
                }
            </div>
        );
    }
}

PureCommentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.any),
};

PureCommentList.defaultProps = {
    comments: [],
};
