import React, { Component } from 'react';

import PositionFilter from 'Shared/PositionFilter/PositionFilter';
import { ajaxInitPositionData } from 'application/App/HouseList/ajaxInitPositionData';

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
    }

    render() {
        const {
            positionFilterData,
        } = this.state;

        return (
            <PositionFilter
                positionFilterData={positionFilterData}
                onFilterConfirm={this.props.onFilterConfirm}
            />
        );
    }
}