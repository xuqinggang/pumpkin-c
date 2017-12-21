import React, { Component } from 'react';

// 业务组件
import HeadShared from 'components/App/HouseDetail/HeadShared/HeadShared';
import HouseLists from 'components/App/HouseList/HouseLists';
import Filter from 'components/App/HouseList/Filter/Filter';

import fetchRentUnitList from './fetchRentUnitList';

import Service from 'lib/Service';
import { shallowEqual } from 'lib/util';

import './styles.less';
const houselistClassPrefix = 'g-houselist';

export default class HouseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            positionFilterData: null,

            filter: {},
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
    }

    componentDidMount() {
        this.handleFetchList('RESET');
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

                this.setState({
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
                });
            });
    }

    onFilterConfirm = (filter) => {
        if (!shallowEqual(this.state.filter, filter)) {
            const newFilter = Object.assign({}, filter);
            this.setState({
                filter: newFilter,
            }, () => {
                this.handleFetchList('RESET');
            });
        }
    }

    handleLoadMore() {
        this.handleFetchList('LOADMORE');
    }

    handleTouchTap() {
        console.log('App HouseList handleTouchTap')
    }

    handleClick() {
        console.log('App HouseList handleClick')
    }

    render() {
        console.log('render', this.state.filter);
        return (
            <div onTouchTap={this.handleTouchTap} onClick={this.handleClick}>
                <HeadShared />
                <hr className="u-housedetail-partline"/>
                <Filter
                    className={`${houselistClassPrefix}-filter`}
                    onFilterConfirm={this.onFilterConfirm}
                />
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
