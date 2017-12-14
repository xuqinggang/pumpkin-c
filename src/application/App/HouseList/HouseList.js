import React, { Component } from 'react';
import HeadShared from 'components/App/HouseDetail/HeadShared/HeadShared';
import HouseLists from 'components/App/HouseList/HouseLists/HouseLists';
import PositionFilter from 'components/App/HouseList/PositionFilter/PositionFilter';
import { ajaxInitPositionData } from './ajaxInitHouseList';

import Service from 'lib/Service';
import './styles.less';

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
        ajaxInitPositionData()
            .then((positionFilterData) => {
                this.setState({
                    positionFilterData,
                });
                console.log('positionData', positionFilterData);
            })
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
                <PositionFilter positionFilterData={positionFilterData} />
            </div>
        );
    }
}
