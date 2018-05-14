/* @flow */

import React, { PureComponent } from 'react';

import WindowScrollLoadConnect from 'Shared/WindowScrollLoadConnect/WindowScrollLoadConnect';
import RentUnitPlaceHolder from '../RentUnitPlaceHolder';
import RentUnitItem from '../RentUnitItem';

import './style.less';

const clsPrefix = 'm-rentUnit-list';

type PropType = {
    list: [rentUnitItemType],
    isLoading?: boolean,
};

@WindowScrollLoadConnect()
export default class RentUnitList extends PureComponent<PropType> {
    render() {
        const {
            list,
            isLoading,
        } = this.props;

        return (
            <div className={clsPrefix}>
                {
                    list.map((rentalUnit, index) => (
                        <RentUnitItem key={index} {...rentalUnit} />
                    ))
                }
                {
                    isLoading ?
                        <RentUnitPlaceHolder />
                        : null
                }
            </div>
        );
    }
}
