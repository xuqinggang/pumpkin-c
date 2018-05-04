/* @flow */

import React, { PureComponent } from 'react';

import PositionFilter from 'components/App/HouseList/PositionFilter/PositionFilter';

import './styles.less';

const classPrefix = 'm-positionfilterwrap';

type PropType = {
    onFilterConfirm: Function,
    originData: ?positionOriginDataType,
    onUpdateActiveIndex: (number) => void,
};

export default class PositionFilterWrap extends PureComponent<PropType> {
    handleMaskTap = () => {
        // 通过设置索引为-1，使collapse收起
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
