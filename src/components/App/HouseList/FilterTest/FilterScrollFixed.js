/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import Filter from './Filter';
import { getScrollTop, getFilterFixScrollTop, toggleForbidScrollThrough } from 'lib/util';
import { animateScrollTop } from 'lib/animate';

type PropType = {
    filterInfo: filterReduxType,
    onFilterConfirm: (confirmInfo: {type: string, state: filterStateType}) => void,
};

type StateType = {
    activeIndex: number,
    isFixed: boolean,
};

export default class FilterScrollFixed extends PureComponent<PropType, StateType> {
    state = {
        activeIndex: -1,
        isFixed: false,
    };

    destScrollTop: number;

    // _setFixedState() => {
    //     this.setState({
    //         isFixed:
    //     })
    // }

    _scrollingFixFilterDom = () => {
        const {
            isFixed,
            activeIndex,
        } = this.state;
        if (activeIndex !== -1) return;

        const scrollTop = getScrollTop();

        if (scrollTop >= this.destScrollTop && !isFixed) {
            this.setState({
                isFixed: true,
            });
        } else if (scrollTop < this.destScrollTop && isFixed && activeIndex === -1) {
            this.setState({
                isFixed: false,
            });
        }
    }
    _updateActiveIndex(activeIndex: number) {
        const prevIndex = this.state.activeIndex;
        if (activeIndex === prevIndex) {
            this.setState({
                activeIndex: -1,
                isFixed: true,
            }, () => {
                toggleForbidScrollThrough(false);
            });
        } else {
            this.setState({
                activeIndex,
                isFixed: true,
            }, () => {
                toggleForbidScrollThrough(true);
            });
        }
    }

    onFilterConfirm = (confirmInfo: { type: string, state: filterStateType }) => {
        this.props.onFilterConfirm(confirmInfo);
        this._updateActiveIndex(-1);
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
        window.addEventListener('scroll', this._scrollingFixFilterDom);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._scrollingFixFilterDom);
    }

    render() {
        const {
            activeIndex,
            isFixed,
        } = this.state;
        const {
            filterInfo,
        } = this.props;

        const filterFixedClass = classnames({
            'm-filterfix': isFixed,
        });

        return (
            <div className={filterFixedClass}>
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
