/* @flow */

import React, { PureComponent } from 'react';

import PositionFilter from 'components/App/HouseList/PositionFilter/PositionFilter';

import './styles.less';

const classPrefix = 'm-positionfilterwrap';

type PropType = {
    onFilterConfirm: ({}) => void,
    originData: positionOriginDataType,
    // 设置激活索引，通过设置-1可以收起面板
    onUpdateActiveIndex: (number) => void,
    filterState: positionStateType,
};

export default class PositionFilterWrap extends PureComponent<PropType> {
    onFilterConfirm = (arg: {}) => {
        this.props.onFilterConfirm(arg);
        this.props.onUpdateActiveIndex(-1);
    }

    handleMaskTap = () => {
        this.props.onUpdateActiveIndex(-1);
    }

    render() {
        const {
            filterState,
            originData,
            onFilterConfirm,
        } = this.props;

        return (
            <div
                className={`${classPrefix}-mask`}
                onTouchTap={this.handleMaskTap}
            >
                {
                    originData ?
                        <PositionFilter
                            filterState={filterState}
                            positionFilterDataObj={originData}
                            onFilterConfirm={onFilterConfirm}
                        />
                        : null
                }
            </div>
        );
    }
}
