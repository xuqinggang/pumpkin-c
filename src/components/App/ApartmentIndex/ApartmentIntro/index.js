import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const classPrefix = 'm-apartment-intro';

const isShowImg = window.screen.width > 320;

export default class ApartmentIntro extends PureComponent {
    render() {
        const { name, image, slogan, minPrice, score, goCommentList, goDetail } = this.props;
        return (
            <div className={`${classPrefix} g-grid-row f-flex-align-center`}>
                {
                    isShowImg && <img src={image} alt={name} onTouchTap={goDetail} />
                }
                <div className="intro-wrap" onTouchTap={goDetail}>
                    <div className={`${classPrefix}-first-line`}>
                        <span className="name f-singletext-ellipsis">{name}</span>
                        <span className="price f-singletext-ellipsis">¥{minPrice}元/月<span>起</span></span>
                    </div>
                    <div className="intro">
                        {slogan}
                    </div>
                </div>
                <div className="score-wrap">
                    <div className="score">{score === 0 ? '5.0' : score.toString()}</div>
                    <div className="go-comments f-display-flex f-flex-align-center" onTouchTap={goCommentList}>查看评价<i className="icon-pull-down" /></div>
                </div>
            </div>
        );
    }
}

ApartmentIntro.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    intro: PropTypes.string,
    minPrice: PropTypes.number,
    score: PropTypes.number,

    goCommentList: PropTypes.func,
    goDetail: PropTypes.func,
};

ApartmentIntro.defaultProps = {
    name: '',
    image: '',
    intro: '',
    minPrice: 0,
    score: 0,

    goCommentList: () => null,
    goDetail: () => null,
};

