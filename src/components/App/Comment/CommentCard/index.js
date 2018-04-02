import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import './styles.less';
import { withHistory } from 'application/App/routes';
import { createCommentInputPath } from 'application/App/Comment';
import Button from '../Button';

const classPrefix = 'm-commentcard';

class CommentCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleTouchTap = () => {
        this.goCommentInput('9090909090');
    }

    goCommentInput = withHistory(this.props.history)(createCommentInputPath)

    render() {
        return (
            <div className={`${classPrefix}`}>
                <p className="close">x</p>
                <div className="content g-grid-row">
                    <div>
                        <div className="tip">你有一个房源待评价</div>
                        <div className="rent">你有一个房源待评价</div>
                    </div>
                    <Button className={`${classPrefix}-button`}>去评论</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(CommentCard);
