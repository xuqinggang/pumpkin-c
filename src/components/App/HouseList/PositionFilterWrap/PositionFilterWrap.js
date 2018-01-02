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

    setPositionFilterStateData() {
        if ('filterState' in this.props) {
            this.setState({
                filterState: this.props.filterState,
            });
        }
    }

    componentDidMount() {
        ajaxInitPositionData()
            .then((positionFilterDataArr) => {
                if (positionFilterDataArr) {
                    const newPositionFilterDataArr = [...positionFilterDataArr, ...this.state.positionFilterDataArr];
                    this.setState({
                        positionFilterDataArr: newPositionFilterDataArr,
                    });

                    // this.setPositionFilterStateData();

                    window.setStore('positionFilterDataArr', { data: positionFilterDataArr });
                    const { label } = positionFilterStateToParams(this.props.filterState);
                    this.props.onDynamicSetLabel(label);
                }
                console.log('ajax positionData', positionFilterDataArr);
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

                    // this.setPositionFilterStateData();

                    window.setStore('positionFilterDataArr', { data: newPositionFilterDataArr });
                }
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    onFilterConfirm = (positionFilterStateObj) => {
        this.props.onFilterConfirm(positionFilterStateObj);
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
