import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { rentUnitShape, pagerShape } from 'base/propTypes';
import { getDocHeight } from 'lib/util';
import RentUnitPlaceHolder from '../RentUnitPlaceHolder';
import RentUnitItem from '../RentUnitItem';
import './style.less';

const clsPrefix = 'm-rentUnit-list';

export default class RentUnitList extends Component {
    constructor(props) {
        super(props);
        this.lastScrollTop = 0;
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleLoadMore);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleLoadMore);
    }
    handleLoadMore = () => {
        const reserveSize = 200;
        const scrollTop = window.pageYOffset || window.screenY;
        if (scrollTop > this.lastScrollTop) {
            // 向下滚动
            if ((getDocHeight() - window.innerHeight - scrollTop) <= reserveSize) {
                const { curPage, totalPage } = this.props.pager;
                if (curPage < totalPage) {
                    this.props.onLoadMore();
                }
            }
        }
        this.lastScrollTop = scrollTop;
    }
    render() {
        return (
            <div className={clsPrefix}>
                {
                    this.props.list.map((rentalUnit, index) => (
                        <RentUnitItem key={index} {...rentalUnit} />
                    ))
                }
                {
                    this.props.loading || this.props.isFetchCrash
                    ? <RentUnitPlaceHolder />
                    : null
                }
            </div>
        );
    }
}

RentUnitList.propTypes = {
    list: PropTypes.arrayOf(rentUnitShape),
    onLoadMore: PropTypes.func,
    loading: PropTypes.bool,
    isFetchCrash: PropTypes.bool,
    pager: pagerShape,
};

RentUnitList.defaultProps = {
    list: [],
    onLoadMore: () => {},
    loading: false,
    isFetchCrash: false,
    pager: {
        curPage: 1,
        totalPage: 1,
    },
};
