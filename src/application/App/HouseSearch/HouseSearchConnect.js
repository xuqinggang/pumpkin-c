/* @flow */

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import {
    parsePositionSearchToFilterInfo,
    jumpHouseList,
    setFilterStore,
    clearOtherFilter,
    clearPositionFilter,
    setSearchStore,
} from 'application/App/HouseSearch/transId';
import { historyRecordStorage } from 'application/App/storage';

const TypeMapParamId = {
    blocks: 'blockId',
    addresses: 'blockId',
    apartments: 'apartmentId',
    keywords: 'keyword',
};

function setStorage(data) {
    const {
        text,
    } = data;

    const reg = /<\/?em>/g;
    const newText = text.replace(reg, '');
    historyRecordStorage.update({ ...data, text: newText });

    if (historyRecordStorage.len() > 10) {
        historyRecordStorage.pop();
    }
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

                // 先清理
                clearOtherFilter();
                clearPositionFilter();

                setFilterStore({
                    paramsObj: {
                        [TypeMapParamId[type]]: fieldValue,
                    },
                });

                // history record storage
                setStorage(data);

                // search store
                setSearchStore(text);

                // 清空 houseList store
                window.setStore('houseList', null);

                jumpHouseList(this.props.history);
            }

            // districts circles subways stations
            onPositionSearchItemTap = (data) => {
                const {
                    type,
                    text,
                    superField,
                    superFieldValue,
                    field,
                    fieldValue,
                } = data;


                // history record storage
                setStorage(data);

                // filterInfo = {urlFrg, label, state, paramsObj}
                const filterInfo = parsePositionSearchToFilterInfo({superField, superFieldValue, field, fieldValue});

                // 先清理
                clearOtherFilter();
                clearPositionFilter();

                // search store
                setSearchStore(text)

                setFilterStore({
                    type: 'position',
                    ...filterInfo,
                });

                // 清空 houseList store
                window.setStore('houseList', null);

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
