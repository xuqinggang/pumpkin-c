import React, { Component } from 'react';

// 业务组件
import HeadShared from 'components/App/HouseDetail/HeadShared/HeadShared';
import HouseLists from 'components/App/HouseList/HouseLists/HouseLists';
import Filter from 'components/App/HouseList/Filter/Filter';

import Service from 'lib/Service';
import './styles.less';

const houselistClassPrefix = 'g-houselist';

export default class HouseList extends Component {
    constructor(props) {
        super(props);

        this.filterParams = null;
    }

    handleTouchTap() {
        console.log('App HouseList handleTouchTap')
    }

    handleClick() {
        console.log('App HouseList handleClick')
    }

    onFilterConfirm = (filterParams) => {
        this.filterParams = filterParams;
        console.log('filterParams', filterParams);
    }

    render() {
        console.log('App HouseLists render');

        return (
            <div onTouchTap={this.handleTouchTap} onClick={this.handleClick}>
                <HeadShared />
                <hr className="u-housedetail-partline"/>
                <Filter 
                    className={`${houselistClassPrefix}-filter`}
                    onFilterConfirm={this.onFilterConfirm}
                />
                <HouseLists />
            </div>
        );
    }
}
