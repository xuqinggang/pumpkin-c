import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { dateFormat } from 'lib/util';
import ExpandText from 'Shared/ExpandText/ExpandText';
import { goHouseDetail } from 'application/App/routes/routes';
import Stars from '../Stars';

import { DirectTypeMapText } from 'baseData/MapData';

import './styles.less';

const classPrefix = 'm-commentitem';

const imgCutModifier = '?crop=1&cpos=middle&w=200&h=200';

class CommentItem extends PureComponent {
    handleTouchTap = (rentUnitId) => {
        this.goHouseDetail(rentUnitId);
    }

    goHouseDetail = goHouseDetail(this.props.history)

    render() {
        const { comment } = this.props;

        const {
            userInfo,
            score,
            createTime,
            updateTime,
            content,
            images,
            rentUnit,
            title,
        } = comment;

        const { nickname, avatar } = userInfo || {};
        const { blockName, rentUnitId, bedroomCount, direct } = rentUnit || {};

        return (
            <div className={`${classPrefix}`}>
                <div className="usr-info f-display-flex f-flex-align-center">
                    {
                        avatar
                            ? <img className="avatar" src={avatar} alt="" />
                            : <div className="circle-avatar" />
                    }
                    <div className="f-display-flex f-flex-justify-between right-wrap">
                        <div className="stars-wrap">
                            <div className="nickname">{nickname}</div>
                            <Stars
                                className="stars"
                                count={5}
                                value={parseInt(score, 10)}
                                edit={false}
                                onChange={this.handleStars}
                                size={24}
                                color2="#F38D39"
                            />
                        </div>
                        <div className="time">{dateFormat(updateTime * 1000)}</div>
                    </div>
                </div>
                <div className="content">
                    <ExpandText color="#666" intro={content || '此用户未填写评价内容'} />
                    {
                        images && images.map((image, index) => (
                            <img className="comment-img" src={`${image}${imgCutModifier}`} alt="" key={index} />
                        ))
                    }
                    <div className="rent-unit f-display-flex f-flex-align-center" onTouchTap={() => this.handleTouchTap(rentUnitId)}>
                        <img src={require('./images/little-house.png')} alt="" />
                        {
                            title
                                ? title
                                : `${blockName}-${bedroomCount}居室-${DirectTypeMapText[direct]}`
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CommentItem);
