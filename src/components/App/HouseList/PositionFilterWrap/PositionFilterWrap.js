/* @flow */

import React, { PureComponent, Component } from 'react';

import PositionFilter from 'components/App/HouseList/PositionFilter/PositionFilter';
import { ajaxInitPositionData, stuffAroundDataToPosition } from 'application/App/HouseList/ajaxInitPositionData';
import { parsePositionUrlToStateAndLabel } from 'application/App/HouseList/transState';

type PropType = {
    onFilterConfirm: Function,
};

type StateType = {
    positionFilterDataObj: ?{
        [type: string]: {
            [id: string]: {
                text: string,
                sub: {
                    [id: string]: string,
                },
                isCanCancel?: boolean,
            },
        },
    },
};

// 位置筛选，请求初始化筛选数据
export default class PositionFilterWrap extends Component<PropType, StateType> {
    constructor(props: PropType) {
        super(props);
        this.state = {
            positionFilterDataObj: null,
        };
    }

    onFilterConfirm = (positionFilterStateObj: {}) => {
        console.log('positionFilterStateObj', positionFilterStateObj);
        this.props.onFilterConfirm(positionFilterStateObj);
    }

    // componentWillMount() {
    //     const positionFilterDataArrStore = window.getStore('positionFilterDataArr');

    //     // 如果存在数据，则不请求
    //     if (positionFilterDataArrStore && positionFilterDataArrStore.data) {
    //         this.setState({
    //             positionFilterDataArr: positionFilterDataArrStore.data,
    //         });

    //         return;
    //     }
    // }

    componentDidMount() {
        ajaxInitPositionData()
            .then((positionFilterDataObj) => {
                // if (positionFilterDataArr) {
                //     const newPositionFilterDataArr = [...positionFilterDataArr, ...this.state.positionFilterDataArr];
                window.setStore('positionFilterDataObj', { data: positionFilterDataObj });
                this.setState({
                    positionFilterDataObj,
                });
                const rt = parsePositionUrlToStateAndLabel('c66678-d117872');
                console.log('pt', rt);

                //     const { label } = positionFilterStateToParams(this.props.filterState);
                    this.props.onDynamicPtStateAndLabel(rt);
                // }
            });

        // 手动添加附近相关数据
        // 如果地理位置权限允许，则添加附近数据
        // stuffAroundDataToPosition()
        //     .then((positionArroundObj) => {
        //         if (positionArroundObj) {
        //             const newPositionFilterDataArr = [...this.state.positionFilterDataArr, positionArroundObj];
        //             this.setState({
        //                 positionFilterDataArr: newPositionFilterDataArr,
        //             });

        //             window.setStore('positionFilterDataArr', { data: newPositionFilterDataArr });

        //             const { label } = positionFilterStateToParams(this.props.filterState);
        //             this.props.onDynamicSetLabel(label);
        //         }
        //     })
            // .catch((err) => {
            //     // 如果地理位置没有获取权限
            //     const { firstItemSelectedIndex, secondItemSelectedIndex, thirdItemSelectedIndex } = this.props.filterState;
            //     if (firstItemSelectedIndex === 2 && secondItemSelectedIndex) {
            //         this.props.onDynamicSetLabel(`${secondItemSelectedIndex}km`);
            //     }
            // })
    }

    render() {
        const {
            positionFilterDataObj,
        } = this.state;

        const {
            filterState,
        } = this.props;
        
        return (
            positionFilterDataObj ? 
            <PositionFilter
                filterState={filterState}
                positionFilterDataObj={positionFilterDataObj}
                onFilterConfirm={this.onFilterConfirm}
            />
            : null
        );
    }
}
