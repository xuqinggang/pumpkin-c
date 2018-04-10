import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { goCommentInput, goRentUnitDetail } from 'application/App/routes/routes';
import './styles.less';
import CommentCardWrap from '../CommentCardWrap';
import WaitImage from './images/wait-for-comment.jpg';

import Button from '../Button';

const classPrefix = 'm-commentcard';

// TODO 抽象一个 remind card purecomponent

class CommentCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleGoComment = (e) => {
        const { apartmentId, rentUnitId } = this.props;
        this.goCommentInput(apartmentId, rentUnitId);
        e.stopPropagation();
    }

    handleClose = (e) => {
        this.props.handleClose();
        e.stopPropagation();
    }

    handleGoRentUnit = () => {
        const { rentUnitId } = this.props;
        this.goRentUnitDetail(rentUnitId);
    }

    goCommentInput = goCommentInput(this.props.history)
    goRentUnitDetail = goRentUnitDetail(this.props.history)

    render() {
        const { title } = this.props;
        return (
            <div className={`${classPrefix}`} onTouchTap={this.handleGoRentUnit}>
                <p className="close">
                    <i className="icon-small-close" onTouchTap={this.handleClose} />
                </p>
                <div className="content g-grid-row">
                    <div>
                        <div className="tip f-display-flex f-flex-align-center">
                            <img className="wait-for-comment" src={WaitImage} alt="" />
                            你有一个房源待评价
                        </div>
                        <div className="rent">{title}</div>
                    </div>
                    <Button
                        className={`${classPrefix}-button`}
                        onTouchTap={this.handleGoComment}
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
