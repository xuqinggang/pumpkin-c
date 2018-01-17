import React, { PureComponent } from 'react';
import classnames from 'classnames';

import ExpandText from 'Shared/ExpandText/ExpandText';

const classPrefix = 'm-houseintro';

export default class HouseIntro extends PureComponent {
    render() {
        const { 
            className,
            houseIntroStr,
        } = this.props;

        return (
            <div className={`${classPrefix} ${className}`}>
                <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>房源介绍</h1>
                <ExpandText intro={houseIntroStr} />
            </div>
        )
    }
}
