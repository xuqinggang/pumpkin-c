import React, { PureComponent } from 'react';
import DropDownScreen from 'Shared/DropDownScreen/DropDownScreen';

// 两种筛选组件
import PositionFilterWrap from 'components/App/HouseList/PositionFilterWrap/PositionFilterWrap';

import './styles.less';

const classPrefix = 'm-apartmentfilter';

export default class ApartmentFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 滚动时filterDom是否fixed
            isFixed: false,
            filterShow: {
                position: false,
            },
        };
    }

    componentWillMount() {}

    render() {
        const {
            className,
            filterState,
            filterLabel,
        } = this.props;
        const {
            filterShow,
            isFixed,
        } = this.state;
        return (
            <ul className={`g-grid-row f-flex-justify-between ${classPrefix}`}>
                <li className={`f-display-flex f-flex-align-center ${classPrefix}-item`}>
                    <DropDownScreen
                        className={`${classPrefix}-dropscreen-position`}
                        show={filterShow.position}
                        type="position"
                        label={filterLabel.position}
                        isMask={true}
                        screenHeight="10.66667rem"
                        isFullScreen={false}
                        onTouchTap={this.handleFilterShowTap}
                    >
                        <PositionFilterWrap
                            type="position"
                            filterState={filterState.position}
                            onFilterConfirm={this.onFilterPositionConfirm}
                            onDynamicSetLabel={this.props.onDynamicSetLabel}
                        />
                    </DropDownScreen>
                </li>
            </ul>
        );
    }
}
