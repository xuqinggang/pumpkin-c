import React, { PureComponent } from 'react';

import {
    ApartmentHead,
    ApartmentFilter,
    PureApartmentList,
} from 'components/App/ApartmentList';

import './styles.less';

const classPrefix = 'g-apartmentlist';

export default class ApartmentList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 2个筛选面板的state
            filterLabel: {
                position: '位置',
                brand: '品牌',
            },
            // 筛选初始状态
            filterState: {
                position: {},
                brand: [],
            },
        };
    }

    // 由于位置筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label
    _dynamicSetPositionFilterLabel = (label) => {
        this.setState({
            filterLabel: Object.assign({}, this.state.filterLabel, { position: label }),
        });
    }

    render() {
        const {
            filterState,
            filterLabel,
        } = this.state;
        return (
            <div className={`${classPrefix}`}>
                <div className={`${classPrefix}-fixed-top`}>
                    <ApartmentHead />
                    <ApartmentFilter
                        className="apartmentfilter"
                        filterState={filterState}
                        filterLabel={filterLabel}
                        onFilterConfirm={this.onFilterConfirm}
                        onFilterClear={this.onFilterClear}
                        onFilterReSume={this.onFilterReSume}
                        onDynamicSetLabel={this._dynamicSetPositionFilterLabel}
                    />
                </div>
                <div className={`${classPrefix}-padding-top`}>
                    <PureApartmentList />
                </div>
            </div>
        );
    }
}
