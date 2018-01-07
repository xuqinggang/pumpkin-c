import React, { PureComponent } from 'react';

// 业务组件
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

const houselistClassPrefix = 'g-houselist';

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
            filterState: {},
            // filter参数
            filter: {
                apartmentId: this.getParamsObj.apartment || null,
            },
            pager: {
                curPage: 1,
                totalPage: 1,
            },

            rentUnitList: [],
            suggestRentUnitList: [],
            fetching: false,
            isFetchCrash: false,

            fetchFor: 'RESET', // 页面重置类型的数据请求，整个列表变化
        };

        this.handleLoadMore = this.handleLoadMore.bind(this);

        // 动态更改标题
        dynamicDocTitle('南瓜租房');
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


    handleFetchList(fetchFor) {
        if (this.state.fetching) {
            return;
        }

        let { curPage, totalPage } = this.state.pager;
        if (fetchFor === 'LOADMORE') {
            curPage += 1;
        }
        if (fetchFor === 'RESET') {
            curPage = 1;
            totalPage = 1;
        }

        this.setState({
            fetchFor,
            ...(fetchFor === 'RESET' ? {rentUnitList: []} : {}),

            fetching: true,
        });

        fetchRentUnitList({ filter: this.state.filter, pager: { curPage, totalPage } })
            .then((res) => {
                let rentUnitList = [];
                if (fetchFor === 'LOADMORE') {
                    rentUnitList = this.state.rentUnitList.concat(res.data.rentUnitList);
                }

                if (fetchFor === 'RESET') {
                    rentUnitList = res.data.rentUnitList;
                }

                const newState = {
                    fetching: false,
                    isFetchCrash: res.fetch.type === 'CRASH',
                    rentUnitList,
                    suggestRentUnitList: res.data.suggestRentUnitList,
                    pager: {
                        ...res.data.pager,
                        ...(res.fetch.type === 'SUCCESS'
                        ? {}
                        : { curPage: this.state.pager.curPage }
                    ),
                    },
                };
                this.setState(newState);

                // setStore
                window.setStore('houseList', newState);
            });
    }

    onFilterConfirm = (filterParams, filterStateObj) => {
        const newFilterParams = Object.assign({}, this.state.filter, filterParams);
        console.log('fiter', newFilterParams, this.state.filter);
        if (!shallowEqual(this.state.filter, newFilterParams)) {
            this.setState({
                filter: newFilterParams,
            }, () => {
                this.handleFetchList('RESET');

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
                    const timer = setTimeout(() => {
                        clearTimeout(timer);
                        this.wxShare();
                    }, 500);
                }
            });
        }
    }

    wxShare(link) {
        // 分享
        execWxShare({
            title: '上南瓜租房，找品牌公寓',
            link: window.location.href.split('#')[0],
            imgUrl: 'https://pic.kuaizhan.com/g3/42/d4/5a65-2d67-4947-97fd-9844135d1fb764/imageView/v1/thumbnail/200x200',
            desc: '南瓜租房，只租真房源！',
        });
    }

    handleLoadMore() {
        this.handleFetchList('LOADMORE');
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
                    filter: Object.assign({}, this.state.filter, extraTypeFilterParams, positionFilterParams),
                    filterLabel: Object.assign({}, this.state.filterLabel, filterParamsAndLabel.label),
                });
            }
        }
        this.wxShare();
    }

    componentDidMount() {
        const storeHouseListState = window.getStore('houseList');
        if (storeHouseListState) {
            this.setState(storeHouseListState, () => {
                const scrollTop = window.getStore('scrollTop').pt;
                console.log('scrollTop', scrollTop);
                window.scrollTo(0, scrollTop);
            });
        } else {
            this.handleFetchList('RESET');
        }
    }
    
    render() {
        const {
            filterState,
            filterLabel,
        } = this.state;
        console.log('render', this.state.filter, this.state.filterState);

        return (
            <div>
                <div className={`${houselistClassPrefix}-head`}>
                    {
                        !isApp ?
                        <HeadTitle />
                        : null
                    }
                    <Filter
                        className="filter"
                        filterState={filterState}
                        filterLabel={filterLabel}
                        onFilterConfirm={this.onFilterConfirm}
                    />
                </div>
                <HouseLists
                    rentUnitList={{
                        pager: this.state.pager,
                        list: this.state.rentUnitList,
                        onLoadMore: this.handleLoadMore,
                    }}
                    suggestRentUnitList={{
                        list: this.state.suggestRentUnitList,
                    }}
                    isFetchCrash={this.state.isFetchCrash}
                    fetchFor={this.state.fetchFor}
                    isLoading={this.state.fetching}
                />
            </div>
        );
    }
}
