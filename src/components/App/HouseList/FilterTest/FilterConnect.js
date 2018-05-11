/* @flow */

import React, { PureComponent } from 'react';

type PropType = {
    // 初始状态，用于清空时
    initialState: filterStateType,
    filterState: filterStateType,
    onUpdateActiveIndex: (number) => void,
    onFilterConfirm: (filterStateType) => void,
};

type StateType = {
    activeIndex: number,
};

// 高阶组件-添加清空和确定功能
export default function FilterConnectWrapper(WrappedCom: React$ComponentType<*>) {
    return class FilterConnect extends PureComponent<PropType, StateType> {
        state = {
            activeIndex: -1,
        };

        onChange = (activeIndex: number) => {
            this.setState({
                activeIndex,
            });
        }

        render() {
            const {
                activeIndex,
            } = this.state;

            return (
                <div>
                    <WrappedCom
                        {...this.props}
                        onChange={this.onChange}
                        activeIndex={activeIndex}
                    />
                </div>
            );
        }
    };
}
