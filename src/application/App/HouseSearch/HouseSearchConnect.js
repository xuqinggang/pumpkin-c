/* @flow */

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router'

import {
    parsePositionSearchToFilterInfo,
    jumpHouseList,
    setFilterStore,
} from 'application/App/HouseSearch/transId';
import { historyRecordStorage } from 'application/App/storage';

const TypeMapParamId = {
    blocks: 'blockId',
    addresses: 'blockId',
    apartments: 'apartmentId',
    keywords: 'keyword',
};

function setStorage(data) {
    console.log('data', data)
    const {
        text,
    } = data;

    const reg = /<\/?em>/g;
    const newText = text.replace(reg, '');
    historyRecordStorage.update({...data, text: newText});
}

export default function HouseSearchConnectFunWrap() {
    return function HouseSearchConnectFunInner(WrapperComponent) {
        class HouseSearchConnect extends PureComponent {
            onOtherSearchItemTap = (data) => {
                const {
                    type,
                    text,
                    field,
                    fieldValue,
                } = data;

                setFilterStore({
                    paramsObj: {
                        [TypeMapParamId[type]]: fieldValue,
                    },
                });

                setStorage(data);
                jumpHouseList(this.props.history);
            }

            onPositionSearchItemTap = (data) => {
                const {
                    type,
                    text,
                    superField,
                    superFieldValue,
                    field,
                    fieldValue,
                } = data;


                // storage
                setStorage(data);

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
