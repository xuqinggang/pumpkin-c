import React, { Component } from 'react';

import PositionFilter from 'Shared/PositionFilter/PositionFilter';
import { ajaxInitPositionData, stuffAroundDataToPosition } from 'application/App/HouseList/ajaxInitPositionData';

// 位置筛选，请求初始化筛选数据
export default class PositionFilterWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionFilterData: null,
        };
    }

    componentDidMount() {
        ajaxInitPositionData()
            .then((positionFilterData) => {
                this.setState({
                    positionFilterData,
                });
                console.log('ajax positionData', positionFilterData);
            });

        // 手动添加附近相关数据
        // 如果地理位置权限允许，则添加附近数据
        stuffAroundDataToPosition()
            .then((positionArroundObj) => {
                this.setState({
                    positionFilterData: Object.assign({}, this.state.positionFilterData, { around: positionArroundObj }),
                });
                console.log('positionArroundObj', positionFilterData);
            });
    }

    render() {
        const {
            positionFilterData,
        } = this.state;

        return (
            positionFilterData ? 
            <PositionFilter
                positionFilterData={positionFilterData}
                onFilterConfirm={this.props.onFilterConfirm}
            />
            : null
        );
    }
}
