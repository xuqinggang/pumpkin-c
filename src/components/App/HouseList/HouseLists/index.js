import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RentUnitList from '../RentUnitList';
import RentUnitsSuggest from '../RentUnitsSuggest';
import SingnalLessNote from '../SingnalLessNote';
import CommentCard from 'components/App/Comment/CommentCard';
import { rentUnitShape, pagerShape } from 'baseData/propTypes';
import fetchRentUnitList from 'application/App/HouseList/fetchRentUnitList';
import { isApp } from 'lib/const';
import { shallowEqual, getScrollTop } from 'lib/util';

import './styles.less';

const clsPrefix = 'm-houselists';

// TODO 临时做法
const isApartmentHouseList = () => window.location.href.indexOf('/list/apartment') > -1;

export default class HouseLists extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            minHeight: window.innerHeight - 88,
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
                let { rentUnitList } = this.state;
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
                const storeKey = this.props.storeKey || 'houseList';
                window.setStore(storeKey, newState);
            })
    }

    _markScrollTop() {
        const scrollTop = getScrollTop();
        // 在滚动的时候就记在scrollTop的位置
        window.setStore('scrollTop', { pt: scrollTop });
    }

    _resizeMinHeight() {
        this.setState({
            minHeight: window.innerHeight - 88,
        });
    }

    componentWillMount() {
        const storeKey = this.props.storeKey || 'houseList';
        const filterStoreKey = this.props.filterStoreKey || 'filter';

        const storeHouseListState = window.getStore(storeKey);
        const filterStore = window.getStore(filterStoreKey) || {};
        const { paramsObj } = filterStore || {};

        // console.log(this.props.filterParams, 'this.props.filterParams', paramsObj);

        if (storeHouseListState && shallowEqual(this.props.filterParams, paramsObj)) {
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
        if (isApp()) {
            // 在app中把头部去掉
            this.listDom.style.marginTop = '1.12rem';
        }

        window.addEventListener('scroll', this._markScrollTop);
        window.addEventListener('resize', this._resizeMinHeight);
    }

    componentWillReceiveProps(nextProps, nextState) {
        // console.log('HouseLists componentWillReceiveProps', this.props.filterParams, nextProps.filterParams);
        this.filterParams = nextProps.filterParams;
        if (this.filterParams && !shallowEqual(this.filterParams, this.props.filterParams)) {
            this.handleFetchList('INIT');
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._markScrollTop);
        window.removeEventListener('resize', this._resizeMinHeight);
    }

    render() {
        const {
            isFetchCrash,
            rentUnitList,
            suggestRentUnitList,
            isFetching,
            pager,
            minHeight,
        } = this.state;

        return (
            <div className={clsPrefix}
                ref={ (listDom) => { this.listDom = listDom; } }
                style={{'minHeight': `${minHeight}px`}}>
                {
                    rentUnitList.length > 0 && !isApartmentHouseList() &&
                        <div className={`${clsPrefix}-comment`}>
                            <CommentCard />
                        </div>
                }
                <RentUnitList
                    list={rentUnitList}
                    pager={pager}
                    loading={isFetching}
                    onLoadMore={this.handleLoadMore}
                />
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
