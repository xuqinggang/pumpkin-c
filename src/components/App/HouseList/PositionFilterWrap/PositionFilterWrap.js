import React, { PureComponent, Component } from 'react';

import PositionFilter from 'components/App/HouseList/PositionFilter/PositionFilter';
import { ajaxInitPositionData, stuffAroundDataToPosition } from 'application/App/HouseList/ajaxInitPositionData';

// 转换state->params和label
import { 
    positionFilterStateToParams,
} from 'application/App/HouseList/filterStateToParams';

// 位置筛选，请求初始化筛选数据
export default class PositionFilterWrap extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            positionFilterDataArr: [],
        };
    }

    onFilterConfirm = (positionFilterStateObj) => {
        this.props.onFilterConfirm(positionFilterStateObj);
    }

    componentWillMount() {
        const positionFilterDataArrStore = window.getStore('positionFilterDataArr');

        // 如果存在数据，则不请求
        if (positionFilterDataArrStore && positionFilterDataArrStore.data) {
            this.setState({
                positionFilterDataArr: positionFilterDataArrStore.data,
            });

            return;
        }
    }

    componentDidMount() {
        const positionFilterDataArrStore = window.getStore('positionFilterDataArr');
        if (positionFilterDataArrStore && positionFilterDataArrStore.data) return;
        
        ajaxInitPositionData()
            .then((positionFilterDataArr) => {
                if (positionFilterDataArr) {
                    const newPositionFilterDataArr = [...positionFilterDataArr, ...this.state.positionFilterDataArr];
                    window.setStore('positionFilterDataArr', { data: newPositionFilterDataArr });

                    this.setState({
                        positionFilterDataArr: newPositionFilterDataArr,
                    });

                    const { label } = positionFilterStateToParams(this.props.filterState);
                    this.props.onDynamicSetLabel(label);
                }
            });

        // 手动添加附近相关数据
        // 如果地理位置权限允许，则添加附近数据
        stuffAroundDataToPosition()
            .then((positionArroundObj) => {
                if (positionArroundObj) {
                    const newPositionFilterDataArr = [...this.state.positionFilterDataArr, positionArroundObj];
                    this.setState({
                        positionFilterDataArr: newPositionFilterDataArr,
                    });

                    window.setStore('positionFilterDataArr', { data: newPositionFilterDataArr });

                    const { label } = positionFilterStateToParams(this.props.filterState);
                    this.props.onDynamicSetLabel(label);
                }
            })
            .catch((err) => {
                // 如果地理位置没有获取权限
                const { firstItemSelectedIndex, secondItemSelectedIndex, thirdItemSelectedIndex } = this.props.filterState;
                if (firstItemSelectedIndex === 2 && secondItemSelectedIndex) {
                    this.props.onDynamicSetLabel(`${secondItemSelectedIndex}km`);
                }
            })
    }

    render() {
        const {
            positionFilterDataArr,
        } = this.state;

        const {
            filterState,
        } = this.props;
        
        return (
            positionFilterDataArr ? 
            <PositionFilter
                filterState={filterState}
                positionFilterDataArr={positionFilterDataArr}
                onFilterConfirm={this.onFilterConfirm}
            />
            : null
        );
    }
}
