import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const classPrefix = 'm-apartmentintro';

export default class ApartmentIntro extends PureComponent {
    render() {
        const { name, image, intro, minPrice, score, goCommentList, goDetail } = this.props;
        return (
            <div className={`${classPrefix} g-grid-row f-flex-align-center`}>
                <img src={image} alt={name} />
                <div className="intro-wrap" onTouchTap={goDetail}>
                    <div className="f-singletext-ellipsis">
                        <span className="name">{name}</span>
                        <span className="price">¥{minPrice}元/月<span>起</span></span>
                    </div>
                    <div className="intro">
                        {intro}
                    </div>
                </div>
                <div className="score-wrap">
                    <div className="score">{score}</div>
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

