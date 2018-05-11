/* @flow */

import React, { PureComponent } from 'react';

import Filter from './Filter';
import { getScrollTop, getFilterFixScrollTop } from 'lib/util';
import { animateScrollTop } from 'lib/animate';

type PropType = {
    filterInfo: filterReduxType,
    onFilterConfirm: (confirmInfo: {type: string, state: filterStateType}) => void,
};

type StateType = {
    activeIndex: number,
};

export default class FilterScrollFixed extends PureComponent<PropType, StateType> {
    destScrollTop: number;

    state = {
        activeIndex: -1,
    };

    _updateActiveIndex(activeIndex: number) {
        const prevIndex = this.state.activeIndex;
        if (activeIndex === prevIndex) {
            this.setState({
                activeIndex: -1,
            });
        } else {
            this.setState({
                activeIndex,
            });
        }
    }

    onFilterConfirm = (confirmInfo: { type: string, state: filterStateType }) => {
        this.props.onFilterConfirm(confirmInfo);
        this._updateActiveIndex(-1);
        console.log('onFilterConfirm')
    }

    onChange = (activeIndex: number) => {
        const curScrollTop = getScrollTop();

        if (curScrollTop < this.destScrollTop) {
            animateScrollTop(curScrollTop, this.destScrollTop, 250, () => {
                this._updateActiveIndex(activeIndex);
            });
        } else {
            this._updateActiveIndex(activeIndex);
        }
    }

    componentDidMount() {
        this.destScrollTop = getFilterFixScrollTop();
    }

    render() {
        const {
            activeIndex,
        } = this.state;
        const {
            filterInfo,
        } = this.props;

        return (
            <div>
                <Filter
                    filterInfo={filterInfo}
                    onFilterConfirm={this.onFilterConfirm}
                    onChange={this.onChange}
                    outControl
                    activeIndex={activeIndex}
                />
            </div>
        );
    }
}
