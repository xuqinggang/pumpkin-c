import React, { PureComponent } from 'react';
import DropDownScreen from 'Shared/DropDownScreen/DropDownScreen';

// 两种筛选组件
import PositionFilterWrap from 'components/App/HouseList/PositionFilterWrap/PositionFilterWrap';

import { scrollTo, getScrollTop } from 'lib/util';
import { animateScrollTop } from 'lib/animate';

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

    componentDidMount() {
        this.listWrapDom = document.querySelector('.g-apartmentlist');
        // 头部高度
        // this.headDomHeight = Math.round(document.querySelector('.g-houselist-head').offsetHeight);
        // this.bannerDomHeight = Math.round(document.querySelector('.m-indexbanner').offsetHeight);
        // this.recommendDomHeight = Math.round(document.querySelector('.m-indexrecommend').offsetHeight);
        // this.filterFixScrollTop = Math.round(this.bannerDomHeight) + Math.round(this.recommendDomHeight);

        window.addEventListener('scroll', this._fixFilterDom);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._fixFilterDom);
    }

    // 回调函数-弹层是否展现
    handleFilterShowTap = (type, isResetScrollTop) => {
        const preFilterShowState = this.state.filterShow;
        const newFilterShowState = {};

        Object.keys(preFilterShowState).forEach((typeName) => {
            newFilterShowState[typeName] = false;
        });

        newFilterShowState[type] = !preFilterShowState[type];

        // 点击filter先滚动到顶部
        // 起始scrollTop
        let srcScrollTop = getScrollTop();
        if (this.isForbide) {
            srcScrollTop = this.scrollTop;
        }

        // TODO
        this._filterShow(newFilterShowState, type, isResetScrollTop);
    }

    _filterShow(newFilterShowState, type, isResetScrollTop) {
        console.log('_filterShow')
        if (!this.isForbide) {
            this.scrollTop = getScrollTop();
        }

        this.setState({
            filterShow: newFilterShowState,
            isFixed: true,
        }, () => {
            // this._toggleForbideScrollThrough(newFilterShowState[type], isResetScrollTop);
            this.listWrapDom.classList.add('f-list-addpadding');
        });
    }

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
