import React, { Component } from 'react';
import HeadShared from 'components/App/HouseDetail/HeadShared/HeadShared';
import HouseLists from 'components/App/HouseList/HouseLists/HouseLists';
import Filter from 'components/App/HouseList/Filter/Filter';
// import HouseTypeFilter from 'components/App/HouseList/HouseTypeFilter/HouseTypeFilter';
// import MoreFilter from 'components/App/HouseList/MoreFilter/MoreFilter';
// import DropDownScreen from 'Shared/DropDownScreen/DropDownScreen';
// import PositionFilter from 'Shared/PositionFilter/PositionFilter';

// import MoneyFilter from 'Shared/MoneyFilter/MoneyFilter';

import Service from 'lib/Service';
import './styles.less';

const houselistClassPrefix = 'g-houselist';

export default class HouseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            positionFilterData: null,
        };
    }

    handleTouchTap() {
        console.log('handleTouchTap')
    }

    handleClick() {
        console.log('handleClick')
    }

    componentDidMount() {
    }

    onMonenySlider = (data) => {
        this.setState({
            leftValue: data.currentValue0,
            rightValue: data.currentValue1,
        });
        console.log('onMonenySlider', data);
    }

    onFilterConfirm = (data) => {
        console.log('onFilterConfirmxxx', data);
    }

    render() {
        const {
            positionFilterData,
        } = this.state;
        console.log('render state', positionFilterData);

        return (
            <div className="test" onTouchTap={this.handleTouchTap} onClick={this.handleClick}>
                <HeadShared />
                <hr className="u-housedetail-partline"/>
                <HouseLists />
                {
                    // <PositionFilter positionFilterData={positionFilterData} />
                }
                {
                    // <MoneyFilter />
                }
                {
                    // <MoreFilter />
                }
                <Filter 
                    className={`${houselistClassPrefix}-filter`}
                    onFilterConfirm={this.onFilterConfirm}
                />
            </div>
        );
    }
}
