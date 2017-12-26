import React, { Component } from 'react';

import PositionFilter from 'Shared/PositionFilter/PositionFilter';
import { ajaxInitPositionData, stuffAroundDataToPosition } from 'application/App/HouseList/ajaxInitPositionData';
import { findArrayItemByPathIndex } from 'lib/util';

// 位置筛选，请求初始化筛选数据
export default class PositionFilterWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionFilterDataArr: [],
        };
    }

    componentDidMount() {
        ajaxInitPositionData()
            .then((positionFilterDataArr) => {
                this.setState({
                    positionFilterDataArr: [...positionFilterDataArr, ...this.state.positionFilterDataArr],
                });
                console.log('ajax positionData', positionFilterDataArr);
            });

        // 手动添加附近相关数据
        // 如果地理位置权限允许，则添加附近数据
        stuffAroundDataToPosition()
            .then((positionArroundObj) => {
                this.setState({
                    positionFilterDataArr: [...this.state.positionFilterDataArr, positionArroundObj],
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    onFilterConfirm = (stateData) => {
        let positionType, positionData = {};

        const {
            firstItemSelectedIndex,
            secondItemSelectedIndex,
            thirdItemSelectedIndex,
        } = stateData;

        let thirdItem = null, third = null;
        const positionFilterDataArr = this.state.positionFilterDataArr;
        const firstItem = positionFilterDataArr[firstItemSelectedIndex];
        const secondItem = firstItem.itemArr[secondItemSelectedIndex];

        positionType = firstItem.id.type;
        if (thirdItemSelectedIndex !== -1) {
            thirdItem = secondItem.itemArr[thirdItemSelectedIndex];
            third = {
                id: thirdItem.id,
                text: thirdItem.text,
            };
        }

        const second = {
            id: secondItem.id,
            text: secondItem.text,
        };
        positionData[positionType] = {
            second,
            third,
        };

        if (this.props.onFilterConfirm) {
            this.props.onFilterConfirm(positionType, positionData);
        }
    }
    render() {
        const {
            positionFilterDataArr,
        } = this.state;

        return (
            positionFilterDataArr ? 
            <PositionFilter
                positionFilterDataArr={positionFilterDataArr}
                onFilterConfirm={this.onFilterConfirm}
            />
            : null
        );
    }
}
