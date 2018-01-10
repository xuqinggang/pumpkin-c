import React, { PureComponent } from 'react';
import classnames from 'classnames';

import ExpandText from 'Shared/ExpandText/ExpandText';
import defaultImg from './images/default.png';

import './styles.less';

const classPrefix = 'm-apartmentintro';

export default class ApartmentIntro extends PureComponent {
    render() {
        const { className, apartmentIntroData } = this.props;
        const { name, image, intro } = apartmentIntroData;

        return (
            <div className={`${classPrefix} ${className}`}>
                <div className={`${classPrefix}-head`}>
                    <img src={image || defaultImg} alt="" className={`f-vertical-middle ${classPrefix}-img`} />
                    <h1 className={`f-vertical-middle ${classPrefix}-title s-housedetail-comptitle`}>{name}</h1>
                </div>
                <ExpandText intro={intro} />
            </div>
        );
    }
}
