import React, { Component } from 'react';
import HeadShared from 'components/App/HouseDetail/HeadShared/HeadShared';
import HouseLists from 'components/App/HouseList/HouseLists';

import fetchRentUnitList from './fetchRentUnitList';
import { ajaxInitPositionData } from './ajaxInitHouseList';

import './styles.less';

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
        ajaxInitPositionData()
            .then((positionFilterData) => {
                this.setState({
                    positionFilterData,
                });
                console.log('positionData', positionFilterData);
            });

        this.handleFetchList('RESET');
    }

    handleFetchList(fetchFor) {
        if (this.state.fetching) {
            return;
        }

        let { curPage, totalPage } = this.state.pager;
        if (fetchFor === 'LOADMORE') {
            if (curPage === totalPage) return;
            curPage += 1;
        }
        if (fetchFor === 'RESET') {
            curPage = 1;
            totalPage = 1;
        }

        this.setState({
            fetchFor,

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
                    pager: {
                        ...res.data.pager,
                    },
                });
            });
    }
    handleFilterChange(filter) {
        this.setState({
            filter,
        }, () => {
            this.handleFetchList('RESET');
        });
    }
    handleLoadMore() {
        this.handleFetchList('LOADMORE');
    }

    render() {
        return (
            <div>
                <HeadShared />
                <hr className="u-housedetail-partline" />
                <HouseLists
                    rentUnitList={{
                        list: this.state.rentUnitList,
                        loading: this.state.fetching || this.state.isFetchCrash,
                        onLoadMore: this.handleLoadMore,
                    }}
                    suggestRentUnitList={{ list: this.state.suggestRentUnitList }}
                    singnalLess={this.state.fetchFor === 'RESET' && this.state.isFetchCrash}
                />
            </div>
        );
    }
}
