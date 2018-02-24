import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ApartmentItem from '../ApartmentItem';
import { getDocHeight, getScrollTop } from 'lib/util';

import './styles.less';

const classPrefix = 'm-pureapartmentlist';

export default class PureApartmentList extends PureComponent {
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
        const scrollTop = getScrollTop();
        // console.log(scrollTop, getDocHeight(), window.innerHeight);
        if (scrollTop > this.lastScrollTop) {
            // 向下滚动
            if ((getDocHeight() - window.innerHeight - scrollTop) <= reserveSize) {
                const { curPage, totalPage } = this.props.pager;
                if (curPage < totalPage) {
                    console.log('ssss-0---');
                    // this.props.onLoadMore();
                }
            }
        }
        this.lastScrollTop = scrollTop;
    }
    render() {
        return (
            <div className={`${classPrefix}`}>
                {
                    new Array(89).fill(1).map(() => (
                        <ApartmentItem />
                    ))
                }
            </div>
        );
    }
}

PureApartmentList.propTypes = {
    list: PropTypes.arrayOf({}),
    onLoadMore: PropTypes.func,
    loading: PropTypes.bool,
    pager: PropTypes.object,
};

PureApartmentList.defaultProps = {
    list: [],
    onLoadMore: () => {},
    loading: false,
    pager: {
        curPage: 1,
        totalPage: 1,
    },
};
