/* @flow */

import React, { PureComponent, Component } from 'react';

import PositionFilter from 'components/App/HouseList/PositionFilter/PositionFilter';
import { ajaxInitPositionData, stuffAroundDataToPosition } from 'application/App/HouseList/ajaxInitPositionData';
import { parsePositionUrlToStateAndLabel } from 'application/App/HouseList/parseUrl';

type PropType = {
    onFilterConfirm: Function,
    positionOriginData: ?positionOriginDataType,
};

// 位置筛选，请求初始化筛选数据
export default class PositionFilterWrap extends Component<PropType> {
    // constructor(props: PropType) {
    //     super(props);
    //     this.state = {
    //         positionFilterDataObj: {
    //             districts: null,
    //             subways: null,
    //             around: null,
    //         },
    //     };
    // }

//     onFilterConfirm = (positionFilterState: {}) => {
//         this.props.onFilterConfirm(positionFilterState);
//     }

    // componentWillMount() {
    //     const positionFilterDataObjStore = window.getStore('positionFilterDataObj');

    //     if (positionFilterDataObjStore && positionFilterDataObjStore.data) {
    //         this.setState({
    //             positionFilterDataObj: positionFilterDataObjStore.data,
    //         });
    //     }
    // }

    // componentDidMount() {
    //     // 如果存在数据，则不请求
    //     const positionFilterDataObjStore = window.getStore('positionFilterDataObj');
    //     if (positionFilterDataObjStore && positionFilterDataObjStore.data) return;

    //     ajaxInitPositionData()
    //         .then((positionFilterDataObj) => {
    //             const newPositionFilterDataObj = Object.assign({}, this.state.positionFilterDataObj, positionFilterDataObj);
    //             window.setStore('positionFilterDataObj', { data: newPositionFilterDataObj });
    //             this.setState({
    //                 positionFilterDataObj: newPositionFilterDataObj,
    //             });
    //             const filterStore = window.getStore('filter');
    //             const positionUrlFrg = filterStore && filterStore.urlFrg.position;
    //             if (positionUrlFrg) {
    //                 const rt = parsePositionUrlToStateAndLabel(positionUrlFrg);
    //                 this.props.onDynamicPtStateAndLabel(rt);

    //                 const {
    //                     label,
    //                     state,
    //                 } = rt;
    //                 const {
    //                     label: oldLabel,
    //                     state: oldState,
    //                 } = filterStore || {};
    //                 window.setStore('filter', {
    //                     label: Object.assign({}, oldLabel, { position: label }),
    //                     state: Object.assign({}, oldState, { position: state }),
    //                 });
    //             }
    //         });

    //     // 手动添加附近相关数据
    //     // 如果地理位置权限允许，则添加附近数据
    //     // stuffAroundDataToPosition()
    //     //     .then((positionArroundObj) => {
    //     //         const newPositionFilterDataObj = Object.assign({}, this.state.positionFilterDataObj, positionArroundObj);
    //     //         window.setStore('positionFilterDataObj', { data: newPositionFilterDataObj });

    //     //         // if (positionArroundObj) {
    //     //             this.setState({
    //     //                 positionFilterDataObj: newPositionFilterDataObj,
    //     //             });

    //     //         //     window.setStore('positionFilterDataArr', { data: newPositionFilterDataArr });

    //     //         //     const { label } = positionFilterStateToParams(this.props.filterState);
    //     //         //     this.props.onDynamicSetLabel(label);
    //     //         // }
    //     //     })
    //     //     .catch((err) => {
    //     //         // 如果地理位置没有获取权限
    //     //         // const { firstItemSelectedIndex, secondItemSelectedIndex, thirdItemSelectedIndex } = this.props.filterState;
    //     //         // if (firstItemSelectedIndex === 2 && secondItemSelectedIndex) {
    //     //         //     this.props.onDynamicSetLabel(`${secondItemSelectedIndex}km`);
    //     //         // }
    //     //     })
    // }

    render() {
        const {
            filterState,
            positionOriginData,
            onFilterConfirm,
        } = this.props;

        return (
            positionOriginData ?
                <PositionFilter
                    filterState={filterState}
                    positionFilterDataObj={positionOriginData}
                    onFilterConfirm={onFilterConfirm}
                />
                : null
        );
    }
}
