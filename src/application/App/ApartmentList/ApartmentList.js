import React, { PureComponent } from 'react';

import {
    // ApartmentHead,
    ApartmentFilter,
    PureApartmentListWrap,
} from 'components/App/ApartmentList';
import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';

import { paramStateToQuery } from './stateToParams';

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
            filterParamsObj: {}
        };
    }

    componentDidMount() {
        this.wxShare();
    }

    componentWillMount() {
        const filterStore = window.getStore('apartmentFilter');
        if (filterStore) {
            this.setState(filterStore);
        }
    }

    // 由于位置筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label
    _dynamicSetPositionFilterLabel = (label) => {
        this.setState({
            filterLabel: Object.assign({}, this.state.filterLabel, { position: label }),
        });
    }

    onFilterConfirm = (newState) => {
        const { filterState, filterLabel, filterParamsObj } = this.state;

        const querys = paramStateToQuery(newState, filterParamsObj, filterLabel);

        const filter = {
            ...this.state,
            filterParamsObj: querys.params,
            filterState: {
                ...filterState,
                ...newState,
            },
            filterLabel: querys.label,
        };

        window.setStore('apartmentFilter', filter);
        this.setState(filter);
    }

    wxShare() {
        // 分享
        execWxShare({
            title: '北京 - 品质生活独栋公寓', // TODO city
            link: window.location.href.split('#')[0],
            imgUrl: 'https://pic.kuaizhan.com/g3/42/d4/5a65-2d67-4947-97fd-9844135d1fb764/imageView/v1/thumbnail/200x200',
            desc: '生活不止眼前的苟且，还有诗和远方，快来这里看看高品质的集中式公寓吧。',
        });
    }

    render() {
        const { history } = this.props;

        const {
            filterState,
            filterLabel,
            filterParamsObj,
        } = this.state;

        return (
            <div className={`${classPrefix}`}>
                <div className={`${classPrefix}-fixed-top`}>
                    <HouseHead type="apartment" title="集中式公寓" history={history} />
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
                    <PureApartmentListWrap filterParams={filterParamsObj} />
                </div>
            </div>
        );
    }
}
