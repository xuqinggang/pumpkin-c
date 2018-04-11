/* @flow */

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router'

import {
    parsePositionSearchToFilterInfo,
    jumpHouseList,
    setFilterStore,
} from 'application/App/HouseSearch/transId';

const TypeMapParamId = {
    blocks: 'blockId',
    addresses: 'blockId',
    apartments: 'apartmentId',
};

export default function HouseSearchConnectFunWrap() {
    return function HouseSearchConnectFunInner(WrapperComponent) {
        class HouseSearchConnect extends PureComponent {
            onOtherSearchItemTap = (data) => {
                const {
                    type,
                    text,
                    id,
                } = data;

                setFilterStore({
                    paramsObj: {
                        [TypeMapParamId[type]]: id,
                    },
                });

                jumpHouseList(this.props.history);
            }

            onPositionSearchItemTap = (data) => {
                const {
                    text,
                    superField,
                    superFieldValue,
                    field,
                    fieldValue,
                } = data;

                // filterInfo = {urlFrg, label, state, paramsObj}
                const filterInfo = parsePositionSearchToFilterInfo({superField, superFieldValue, field, fieldValue});

                setFilterStore({
                    type: 'position',
                    ...filterInfo,
                });

                jumpHouseList(this.props.history);
            }

            render() {
                return (
                    <WrapperComponent
                        {...this.props}
                        onPositionSearchItemTap={this.onPositionSearchItemTap}
                        onOtherSearchItemTap={this.onOtherSearchItemTap}
                    />
                );
            }
        }

        return withRouter(HouseSearchConnect);
    }
}
