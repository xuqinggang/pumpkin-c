import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { goCommentInput } from 'application/App/routes/routes';
import './styles.less';
import CommentCardWrap from '../CommentCardWrap';

import Button from '../Button';

const classPrefix = 'm-commentcard';

// TODO 抽象一个 remind card purecomponent

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
        this.props.handleClose();
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

CommentCard.defaultProps = {
    handleClose: () => null,
    title: '',
};

CommentCard.propTypes = {
    handleClose: PropTypes.func,
    title: PropTypes.string,
    apartmentId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    rentUnitId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default withRouter(CommentCardWrap(CommentCard));
