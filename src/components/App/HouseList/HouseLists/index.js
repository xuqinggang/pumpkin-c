import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RentUnitList from '../RentUnitList';
import RentUnitsSuggest from '../RentUnitsSuggest';
import SingnalLessNote from '../SingnalLessNote';
import { rentUnitShape, pagerShape } from 'base/propTypes';
import fetchRentUnitList from 'application/App/HouseList/fetchRentUnitList';
import { isApp } from 'lib/const';
import { shallowEqual, getScrollTop } from 'lib/util';

import './styles.less';

const clsPrefix = 'm-houselists';

export default class HouseLists extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

            rentUnitList: [],
            suggestRentUnitList: [],
            // 是否正在请求
            isFetching: false,
            // 是否请求接口崩溃(网络，接口问题)
            isFetchCrash: false,

            pager: {
                curPage: 1,
                totalPage: 1,
            },
        }
        // 筛选请求参数
        this.filterParams = this.props.filterParams;
        // 请求类型，分为：INIT(初始化) 和 MORE(下拉加载)
        this.fetchType = 'INIT'; // 页面重置类型的数据请求，整个列表变化
    }


    handleLoadMore = () => {
        this.handleFetchList('MORE');
    }

    handleFetchList(fetchType) {
        if (this.state.isFetching) {
            return;
        }

        this.fetchType = fetchType;

        let { curPage, totalPage } = this.state.pager;
        if (fetchType === 'MORE') {
            curPage += 1;
        }
        if (fetchType === 'INIT') {
            curPage = 1;
            totalPage = 1;
        }

        this.setState({
            isFetching: true,
        });

        fetchRentUnitList({ filter: this.filterParams, pager: { curPage, totalPage } })
            .then((res) => {
                let rentUnitList = this.state.rentUnitList;
                // 请求为初始化请求，需要设置rentUnitList为空
                if (fetchType === 'INIT') {
                    rentUnitList = [];
                }

                rentUnitList = rentUnitList.concat(res.data.rentUnitList);
                let newState = {
                    isFetching: false,
                    isFetchCrash: res.fetch.type === 'CRASH',
                };

                if (res.fetch.type === 'SUCCESS') {
                    newState = Object.assign(newState, {
                        rentUnitList,
                        suggestRentUnitList: res.data.suggestRentUnitList,
                        pager: res.data.pager,
                    });
                }

                this.setState(newState);

                // setStore
                window.setStore('houseList', newState);
            })
    }

    _markScrollTop() {
        const scrollTop = getScrollTop();
        // 在滚动的时候就记在scrollTop的位置
        window.setStore('scrollTop', { pt: scrollTop });
    }

    componentWillMount() {
        const storeHouseListState = window.getStore('houseList');
        if (storeHouseListState) {
            this.setState(storeHouseListState, () => {
                const storeScrollTop = window.getStore('scrollTop');
                const scrollTop = storeScrollTop && storeScrollTop.pt || 0;
                window.scrollTo(0, scrollTop);
            });
        } else {
            this.handleFetchList('INIT');
        }
    }

    componentDidMount() {
        if (isApp) {
            // 在app中把头部去掉
            this.listDom.style.marginTop = '1.12rem';
        }

        window.addEventListener('scroll', this._markScrollTop);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.filterParams = nextProps.filterParams;
        if (this.filterParams && !shallowEqual(this.filterParams, this.props.filterParams)) {
            this.handleFetchList('INIT');
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._markScrollTop);
    }

    render() {
        const {
            isFetchCrash,
            rentUnitList,
            suggestRentUnitList,
            isFetching,
            pager,
        } = this.state;

        return (
            <div className={clsPrefix} ref={ (listDom) => { this.listDom = listDom; } }>
                {
                    !isFetchCrash
                    ? <RentUnitList
                        list={rentUnitList}
                        pager={pager}
                        loading={isFetching}
                        isFetchCrash={isFetchCrash}
                        onLoadMore={this.handleLoadMore}
                    />
                    : null
                }
                {
                    this.fetchType === 'INIT' && isFetchCrash ? 
                        <SingnalLessNote />
                        : null
                }
                {
                    // 请求列表数目为0
                    rentUnitList.length === 0 && suggestRentUnitList.length > 0 ?
                        <RentUnitsSuggest
                            list={suggestRentUnitList}
                        />
                        : null
                }
            </div>
        );
    }
}

// HouseLists.propTypes = {
//     rentUnitList: PropTypes.shape({
//         onLoadMore: PropTypes.func,
//         list: PropTypes.arrayOf(rentUnitShape),
//         pager: pagerShape,
//     }),
//     suggestRentUnitList: PropTypes.shape({
//         list: PropTypes.arrayOf(rentUnitShape),
//     }),
//     isLoading: PropTypes.bool,
//     isFetchCrash: PropTypes.bool,
//     fetchFor: PropTypes.oneOf(['RESET', 'LOADMORE']),
// };

// HouseLists.defaultProps = {
//     rentUnitList: {
//         onLoadMore: () => {},
//         list: [],
//     },
//     suggestRentUnitList: {
//         list: [],
//     },
//     isLoading: false,
//     isFetchCrash: false,
//     fetchFor: 'RESET',
// };
