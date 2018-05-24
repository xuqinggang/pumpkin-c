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
import { TypeMapText } from 'application/App/HouseList/getStatisticData';
import nanguaPv from 'lib/nanguaPv';

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
            onOtherSearchItemTap = (data, source) => {
                const {
                    type,
                    text,
                    field,
                    fieldValue,
                } = data;

                // nanguaPv 统计
                nanguaPv.pv({
                    keywordSource: source,
                    searchKeyword: text.replace(/<\/?em>/g, ''),
                    keywordType: TypeMapText[type],
                    page: 'SEARCH',
                    element: 'SEARCH_COUNT',
                    event: 'CLICK',
                });

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
            onPositionSearchItemTap = (data, source) => {
                const {
                    type,
                    text,
                    superField,
                    superFieldValue,
                    field,
                    fieldValue,
                } = data;

                // nanguaPv 统计
                nanguaPv.pv({
                    searchKeyword: text.replace(/<\/?em>/g, ''),
                    keywordType: TypeMapText[type],
                    page: 'SEARCH',
                    element: 'SEARCH_COUNT',
                    event: 'CLICK',
                });
                
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
