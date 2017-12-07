import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-apartmentintro';

class ApartmentIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { className, apartmentIntroData } = this.props;
        const { name, image, intro } = apartmentIntroData;

        return (
            <div className={`${classPrefix} ${className}`}>
                <div className={`${classPrefix}-head`}>
                    <img src={image} alt="" className={`f-vertical-middle ${classPrefix}-img`} />
                    <h1 className={`f-vertical-middle ${classPrefix}-title s-housedetail-comptitle`}>{name}</h1>
                </div>
                <div className={`${classPrefix}-intro`}>
                    <p className={`intro-text s-housedetail-introtext`}>
                        {intro}
                    </p>
                </div>
            </div>
        )
    }
}

export default ApartmentIntro;
