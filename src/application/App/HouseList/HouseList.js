import React, { PureComponent } from 'react';

// 业务组件
import IndexHead from 'components/App/HouseIndex/IndexHead/IndexHead';
import IndexBanner from 'components/App/HouseIndex/IndexBanner/IndexBanner';
import IndexRecommend from 'components/App/HouseIndex/IndexRecommend/IndexRecommend';
import HeadTitle from 'components/App/HouseList/HeadTitle/HeadTitle';
import HouseLists from 'components/App/HouseList/HouseLists';
import Filter from 'components/App/HouseList/Filter/Filter';

import fetchRentUnitList from './fetchRentUnitList';
import { stringifyStateObjToUrl, parseUrlToState } from './filterStateToUrl';
import { filterStateToParams } from './filterStateToParams';
import Service from 'lib/Service';
import { shallowEqual, dynamicDocTitle } from 'lib/util';
import { isApp } from 'lib/const';
import { execWxShare } from 'lib/wxShare';

import './styles.less';

const classPrefix = 'g-houselist';

export default class HouseList extends PureComponent {
    constructor(props) {
        super(props);

        this.getParamsObj = this._getGetParams();
        this.state = {
            // 4个筛选面板的state
            filterLabel: {
                position: '位置',
                rent: '租金',
                houseType: '房型',
                more: '更多',
            },
            // 筛选状态
            filterState: {},
            // 筛选的请求参数
            filterParamsObj: {
                apartmentId: this.getParamsObj.apartment || null,
            },
        };

        // 动态更改标题
        dynamicDocTitle('南瓜租房');
    }

    _isPageList() {
        return this.props.match.pageType === 'list';
    }

    _getGetParams() {
        const getParamsObj = {};
        const url = decodeURIComponent(window.location.href);
        const pt = url.indexOf('?');
        if (pt === -1) return getParamsObj;
        const getParamsArr = url.substr(pt+1).split('&');
        getParamsArr.forEach((paramStr) => {
            if (!paramStr) return;
            const keyAndValueArr = paramStr.split('=');
            getParamsObj[keyAndValueArr[0]] = keyAndValueArr[1];
        });

        return getParamsObj;
    }

    // 筛选确认回调
    onFilterConfirm = (filterParams, filterStateObj) => {
        const newFilterParams = Object.assign({}, this.state.filterParamsObj, filterParams);

        if (!shallowEqual(this.state.filterParamsObj, newFilterParams)) {
            this.setState({
                filterParamsObj: newFilterParams,
            }, () => {
                const filterUrlFragment = stringifyStateObjToUrl(filterStateObj);
                if (filterUrlFragment) {
                    let link = '';
                    const cityName = this.props.match.params.cityName;

                    if (this.getParamsObj.apartment) {
                        link = `/${cityName}/nangua/list/${filterUrlFragment}?apartment=${this.getParamsObj.apartment}`;
                    } else {
                        link = `/${cityName}/nangua/list/${filterUrlFragment}`;
                    }

                    this.props.history.push(link);
                    // 未知原因，需要设置延时来确保微信分享正常
                    const timer = setTimeout(() => {
                        clearTimeout(timer);
                        this.wxShare();
                    }, 500);
                }
            });
        }
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

    componentWillMount() {
        const filterUrlFragment = this.props.match.params.filterUrlFragment;
        if (filterUrlFragment) {
            // 注意返回的position，包含state和params
            const filterState = parseUrlToState(filterUrlFragment);
            const { position: positionFilterState, ...extraTypeFilterState } = filterState;

            const filterParamsAndLabel = filterStateToParams(extraTypeFilterState);
            // filter params
            const extraTypeFilterParams = filterParamsAndLabel.filterParams;
            const positionFilterParams = positionFilterState && positionFilterState.params;

            // filter state
            const newFilterState = Object.assign(extraTypeFilterState, { 
                position: positionFilterState && positionFilterState.state
            });

            if (filterState) {
                this.setState({
                    filterState: newFilterState,
                    filterParamsObj: Object.assign({}, this.state.filterParamsObj, 
                        extraTypeFilterParams, positionFilterParams),
                    filterLabel: Object.assign({}, this.state.filterLabel, filterParamsAndLabel.label),
                });
            }
        }
        this.wxShare();
    }

    render() {
        const {
            filterState,
            filterLabel,
            filterParamsObj,
        } = this.state;

        const {
            match,
            history,
        } = this.props;

        // 是否是列表页
        const isPageList = this._isPageList();

        return (
            <div className={`${classPrefix}`}>
                <div className={`${classPrefix}-head`}>
                    <IndexHead match={match} history={history} />
                </div>
                <IndexBanner />
                <IndexRecommend />
                <Filter
                    className="filter"
                    filterState={filterState}
                    filterLabel={filterLabel}
                    onFilterConfirm={this.onFilterConfirm}
                />
                <HouseLists
                    filterParams={filterParamsObj}
                />
            </div>
        );
    }
}
