import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { goCommentInput } from 'application/App/routes/routes';
import './styles.less';
import CommentCardWrap from '../CommentCardWrap';

import Button from '../Button';

const classPrefix = 'm-commentcard';

class CommentCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleTouchTap = () => {
        const { apartmentId, rentUnitId } = this.props;
        this.goCommentInput(apartmentId, rentUnitId);
    }

    handleClose = () => {
        console.log('close');
    }

    goCommentInput = goCommentInput(this.props.history)

    render() {
        const { title } = this.props;
        return (
            <div className={`${classPrefix}`}>
                <p className="close">
                    <i className="icon-small-close" onTouchTap={this.handleClose} />
                </p>
                <div className="content g-grid-row">
                    <div>
                        <div className="tip">你有一个房源待评价</div>
                        <div className="rent">{title}</div>
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

export default withRouter(CommentCardWrap(CommentCard));
