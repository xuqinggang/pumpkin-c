/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// 业务组件
import IndexHead from 'components/App/HouseIndex/IndexHead/IndexHead';
import IndexBanner from 'components/App/HouseIndex/IndexBanner/IndexBanner';
import IndexRecommend from 'components/App/HouseIndex/IndexRecommend/IndexRecommend';
import HouseLists from 'components/App/HouseList/HouseLists/HouseLists';
import Filter from 'components/App/HouseList/FilterTest/FilterScrollFixed';
// import Filter from 'components/App/HouseList/Filter/Filter';
// import BottomOpenNative from 'Shared/BottomOpenNative/BottomOpenNative';

/* saga action */
import { houseListSagaActions } from 'reduxs/modules/HouseList/HouseListRedux';
import { houseIndexSagaActions } from 'reduxs/modules/HouseIndex/HouseIndexRedux';
import { positionFilterSagaActions } from 'reduxs/modules/Filter/FilterPositionRedux';
import { filterSagaActions } from 'reduxs/modules/Filter/FilterRedux';
import { searchSagaActions } from 'reduxs/modules/Search/SearchRedux';
import { urlSagaActions } from 'reduxs/modules/Url/UrlRedux';

/* selector */
import { houseListsSelector } from 'reduxs/modules/HouseList/HouseListSelector';
import { houseIndexSelector } from 'reduxs/modules/HouseIndex/HouseIndexSelector';
import { filterInfoSelector, filterMatchUrlSelector } from 'reduxs/modules/Filter/FilterSelector';
import { searchKeywordSelector, searchTextSelector } from 'reduxs/modules/Search/SearchSelector';

// import { goHouseList } from 'application/App/routes/routes';

// import { isApp } from 'lib/const';
// import { execWxShare } from 'lib/wxShare';
// import { kzPv } from 'lib/pv';

import './styles.less';

const classPrefix = 'g-houselist';

@connect((state, props) => ({
    searchText: searchTextSelector(state),
    houseList: houseListsSelector(state),
    houseIndex: houseIndexSelector(state),
    filterInfo: filterInfoSelector(state),
    filterUrl: filterMatchUrlSelector(props),
}), {
    sagaFilterConfirm: filterSagaActions.filterConfirm,
    sageFilterInit: filterSagaActions.filterUrlInit,
    sagaHouseListInit: houseListSagaActions.houseListInit,
    sagaHouseListAdd: houseListSagaActions.houseListAdd,
    sagaHouseIndexInit: houseIndexSagaActions.houseIndexInit,
    sagaPositionOriginData: positionFilterSagaActions.positionOriginDataInit,
    sagaSearchClear: searchSagaActions.searchClear,
    sagaUrlNavigate: urlSagaActions.urlNavigate,
})
export default class HouseList extends PureComponent {
    constructor(props) {
        super(props);

        this.props.sagaHouseListInit({ filterUrl: props.filterUrl });
        this.props.sagaHouseIndexInit();
        this.props.sagaPositionOriginData();
    }

    // 搜索
    onSearch = () => {
    }

    // 滚动加载
    onLoadMore = () => {
        console.log('onLoadMore')
        this.props.sagaHouseListAdd();
    }

    // 筛选确认
    onFilterConfirm = (confirmInfo: { type: string, state: filterStateType }) => {
        this.props.sagaFilterConfirm(confirmInfo);
    }

    onClearSearch = () => {
        this.props.sagaSearchClear();
    }

    handleTestTap = () => {
    }

    render() {
        const {
            houseList,
            houseIndex,
            filterInfo,
            searchText,

            sagaUrlNavigate,
        } = this.props;
        console.log('HouseList render', this.props);
        return (
            <div className={`${classPrefix}`}>
                <IndexHead
                    className={`${classPrefix}-head`}
                    searchRt={searchText}
                    onClearSearch={this.onClearSearch}
                    urlNavigate={sagaUrlNavigate}
                />
                <IndexBanner {...houseIndex.banner} />
                <IndexRecommend recommends={houseIndex.recommends} />
                <Filter
                    filterInfo={filterInfo}
                    onFilterConfirm={this.onFilterConfirm}
                />
                <HouseLists
                    {...houseList}
                    onLoadMore={this.onLoadMore}
                />
            </div>
        );
        // return (
        //     <div className={`${classPrefix}`}>
        //         <button onTouchTap={this.handleTestTap}>test</button>
        //         <IndexBanner {...houseIndex.banner} />
        //         <IndexRecommend recommends={houseIndex.recommends} />
        //         <Filter
        //             className="filter"
        //             filterInfo={filterInfo}
        //             onFilterConfirm={this.onFilterConfirm}
        //         />
        //         <HouseLists
        //             {...houseList}
        //             onLoadMore={this.onLoadMore}
        //         />
        //     </div>
        // );
    }
}
