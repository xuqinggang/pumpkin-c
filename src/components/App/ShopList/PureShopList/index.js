import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ShopItem from '../ShopItem';
import { getDocHeight, getScrollTop } from 'lib/util';

import './styles.less';

const classPrefix = 'm-pureshoplist';

export default class PureShopList extends PureComponent {
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
                    this.props.onLoadMore();
                }
            }
        }
        this.lastScrollTop = scrollTop;
    }
    render() {
        const { list } = this.props;
        return (
            <div className={`${classPrefix}`}>
                {
                    list.map((shop, index) => (
                        <ShopItem shop={shop} key={index} />
                    ))
                }
            </div>
        );
    }
}

PureShopList.propTypes = {
    list: PropTypes.array,  // TODO
    onLoadMore: PropTypes.func,
    loading: PropTypes.bool,
    pager: PropTypes.object, // TODO
};

PureShopList.defaultProps = {
    list: [],
    onLoadMore: () => {},
    loading: false,
    pager: {
        curPage: 1,
        totalPage: 1,
    },
};
