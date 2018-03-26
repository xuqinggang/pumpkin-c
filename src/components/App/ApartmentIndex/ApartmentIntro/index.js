import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const classPrefix = 'm-apartmentintro';

export default class ApartmentIntro extends PureComponent {
    render() {
        const { name, image, intro, minPrice, score } = this.props;
        return (
            <div className={`${classPrefix} g-grid-row f-flex-align-center`}>
                <img src={image} alt={name} />
                <div className="intro-wrap">
                    <div>
                        <span>{name}</span>
                        <span>{minPrice}</span>
                    </div>
                    <div>
                        {intro}
                    </div>
                </div>
                <div className="score-wrap">
                    <span>{score}</span>
                    <div>查看评价</div>
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
};

ApartmentIntro.defaultProps = {
    name: '',
    image: '',
    intro: '',
    minPrice: 0,
    score: 0,
};

