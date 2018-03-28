import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { dateFormat } from 'lib/util';
import Stars from '../Stars';
import ExpandText from 'Shared/ExpandText/ExpandText';
import { withHistory } from 'application/App/routes';

import './styles.less';

const classPrefix = 'm-commentitem';

const createRentUnitDeatilPath = (rentUnitId) => `/detail/${rentUnitId}`;

class CommentItem extends PureComponent {

    handleTouchTap = (rentUnitId) => {
        this.goRentUnitDetail(rentUnitId)
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
                <div className="usr-info g-grid-row">
                    {
                        avatar
                            ? <img src={avatar} alt="" />
                            : <div className="circle-avatar" />
                    }
                    <div>
                        <div>{nickname}</div>
                        <Stars
                            count={5}
                            value={parseInt(score, 10)}
                            edit={false}
                            onChange={this.handleStars}
                            size={24}
                            color2="#F38D39"
                        />
                    </div>
                    <div>{dateFormat(createTime * 1000)}</div>
                </div>
                <div className="content">
                    <ExpandText intro={content} />
                    {
                        images.map((image, index) => (
                            <img className="comment-img" src={image} alt="" key={index} />
                        ))
                    }
                </div>
                <div className="rent-unit" onTouchTap={() => this.handleTouchTap(rentUnitId)}>
                    {blockName}
                </div>
            </div>
        );
    }
}

export default withRouter(CommentItem);
