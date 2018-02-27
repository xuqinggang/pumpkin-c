import React, { PureComponent } from 'react';

import {
    ApartmentHead,
    ApartmentFilter,
    PureApartmentListWrap,
} from 'components/App/ApartmentList';

import { execWxShare } from 'lib/wxShare';

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
                brand: {},
            },
        };
    }

    componentDidMount() {
        this.wxShare();
    }

    // 由于位置筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label
    _dynamicSetPositionFilterLabel = (label) => {
        this.setState({
            filterLabel: Object.assign({}, this.state.filterLabel, { position: label }),
        });
    }

    onFilterConfirm = (state) => {
        console.log(state, 'state', 'onFilterConfirm');
    }

    wxShare() {
        // 分享
        execWxShare({
            title: '上南瓜租房，找品牌公寓',
            link: window.location.href.split('#')[0],
            imgUrl: 'https://pic.kuaizhan.com/g3/42/d4/5a65-2d67-4947-97fd-9844135d1fb764/imageView/v1/thumbnail/200x200',
            desc: '南瓜租房，只租真房源！',
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
                    <PureApartmentListWrap />
                </div>
            </div>
        );
    }
}
