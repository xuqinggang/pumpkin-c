import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { dateFormat } from 'lib/util';
import ExpandText from 'Shared/ExpandText/ExpandText';
import withHistory from 'application/App/routes/utils';
import Stars from '../Stars';

import './styles.less';

const classPrefix = 'm-commentitem';

const createRentUnitDeatilPath = rentUnitId => `/detail/${rentUnitId}`;

class CommentItem extends PureComponent {
    handleTouchTap = (rentUnitId) => {
        this.goRentUnitDetail(rentUnitId);
    }

    goRentUnitDetail = withHistory(this.props.history)(createRentUnitDeatilPath)

    render() {
        const { comment } = this.props;

        const {
            userInfo: { nickname, avatar },
            score,
            createTime,
            content,
            images,
            rentUnit: { blockName, rentUnitId }
        } = comment;

        return (
            <div className={`${classPrefix}`}>
                <div className="usr-info f-display-flex f-flex-align-center">
                    {
                        avatar
                            ? <img className="avatar" src={avatar} alt="" />
                            : <div className="circle-avatar" />
                    }
                    <div className="f-display-flex f-flex-justify-between right-wrap">
                        <div>
                            <div className="nickname">{nickname}</div>
                            <Stars
                                count={5}
                                value={parseInt(score, 10)}
                                edit={false}
                                onChange={this.handleStars}
                                size={24}
                                color2="#F38D39"
                            />
                        </div>
                        <div className="time">{dateFormat(createTime * 1000)}</div>
                    </div>
                </div>
                <div className="content">
                    <ExpandText intro={content} />
                    {
                        images.map((image, index) => (
                            <img className="comment-img" src={image} alt="" key={index} />
                        ))
                    }
                    <div className="rent-unit f-display-flex f-flex-align-center" onTouchTap={() => this.handleTouchTap(rentUnitId)}>
                        <img src={require('./images/little-house.png')} alt="" />
                        {blockName}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CommentItem);
