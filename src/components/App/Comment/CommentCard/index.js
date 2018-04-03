import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import './styles.less';
import { goCommentInput } from 'application/App/routes/routes';

import Button from '../Button';

const classPrefix = 'm-commentcard';

class CommentCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleTouchTap = () => {
        this.goCommentInput('1', '140826183515361280');
    }

    goCommentInput = goCommentInput(this.props.history)

    render() {
        return (
            <div className={`${classPrefix}`}>
                <p className="close">x</p>
                <div className="content g-grid-row">
                    <div>
                        <div className="tip">你有一个房源待评价</div>
                        <div className="rent">你有一个房源待评价</div>
                    </div>
                    <Button
                        className={`${classPrefix}-button`}
                        onTouchTap={this.handleTouchTap}
                    >去评论
                    </Button>
                </div>
            </div>
        );
    }
}

export default withRouter(CommentCard);
