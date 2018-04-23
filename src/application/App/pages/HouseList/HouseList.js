import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// 业务组件
// import IndexHead from 'components/App/HouseIndex/IndexHead/IndexHead';
import IndexBanner from 'components/App/HouseIndex/IndexBanner/IndexBanner';
import IndexRecommend from 'components/App/HouseIndex/IndexRecommend/IndexRecommend';
import HouseLists from 'components/App/HouseList/HouseLists/HouseLists';
// import Filter from 'components/App/HouseList/Filter/Filter';
// import BottomOpenNative from 'Shared/BottomOpenNative/BottomOpenNative';

/* saga action creator */
import { sagaHouseListActions } from 'reduxs/modules/HouseList/HouseListRedux';
import { sagaHouseIndexInitAction } from 'reduxs/modules/HouseIndex/HouseIndexRedux';

/* selector */
import { houseListsSelector } from 'reduxs/modules/HouseList/HouseListSelector';
import { houseIndexSelector } from 'reduxs/modules/HouseIndex/HouseIndexSelector';

// import { goHouseList } from 'application/App/routes/routes';

// import { isApp } from 'lib/const';
// import { execWxShare } from 'lib/wxShare';
// import { kzPv } from 'lib/pv';

import './styles.less';

const classPrefix = 'g-houselist';

@connect(state => ({
    houseList: houseListsSelector(state),
    houseIndex: houseIndexSelector(state),
}), {
    sagaHouseListInit: sagaHouseListActions.initHouseList,
    sagaHouseListAdd: sagaHouseListActions.addHouseList,
    sagaHouseIndexInit: sagaHouseIndexInitAction,
})
export default class HouseList extends PureComponent {
    constructor(props) {
        super(props);

        this.props.sagaHouseListInit();
        this.props.sagaHouseIndexInit();
    }

    // 搜索
    onSearch = () => {
    }

    // 滚动加载
    onLoadMore = () => {
    }

    // 筛选确认
    onFilterConfirm = () => {
    }

    handleTestTap = () => {
    }

    render() {
        const {
            houseList,
            houseIndex,
        } = this.props;
        console.log('HouseList render', this.props)
        return (
            <div className={`${classPrefix}`}>
                <button onTouchTap={this.handleTestTap}>test</button>
                <IndexBanner {...houseIndex.banner} />
                <IndexRecommend recommends={houseIndex.recommends} />
                <HouseLists
                    {...houseList}
                    onLoadMore={this.onLoadMore}
                />
            </div>
        );
    }
}
