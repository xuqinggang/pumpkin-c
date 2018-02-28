import React, { PureComponent } from 'react';
import classnames from 'classnames';

import ScrollContainer from 'Shared/ScrollContainer/ScrollContainer';
import MeCouponItemExpire from './MeCouponItemExpire';
import MeCouponItemUse from './MeCouponItemUse';

import { ajaxMeUseCoupon, ajaxMeExpireCoupon, ajaxDelExpireCoupon } from 'application/App/HouseMe/ajaxHouseMe';

import nocouponImg from './images/nocoupon.png';
import './styles.less';

const classPrefix = 'm-mecouponlist';

const CouponTypeMap = {
    use: {
        ajaxRequest: ajaxMeUseCoupon,
        ItemComp: MeCouponItemUse,
    },
    expired: {
        ajaxRequest: ajaxMeExpireCoupon,
        ItemComp: MeCouponItemExpire,
    },
};

export default class MeCouponList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            couponList: [],
            isFetching: false,
            nextPage: 1,
            offset: 6,
            totalPage: 1,
        };
    }

    ajaxLoadCouponList = () => {
        const {
            isFetching,
            nextPage,
            totalPage,
            offset,
        } = this.state;
        if (isFetching || nextPage > totalPage) return;

        this.setState({
            isFetching: true,
        });

        const {
            type,
        } = this.props;
        
        const ajaxRequest = CouponTypeMap[type].ajaxRequest;

        ajaxRequest({nextPage, offset})
            .then((data) => {
                const couponList = data.couponBOList;
                if (!couponList) {
                    this.setState({
                        isFetching: false,
                    });
                } else {
                    this.setState({
                        couponList: this.state.couponList.concat(...couponList),
                        nextPage: nextPage + 1,
                        totalPage: Math.ceil(data.count / offset),
                        isFetching: false,
                    });
                }

                window.setStore('mecoupon', {
                    [type]: this.state,
                });
            })
    }

    onDelTap = (index, couponUserId) => {
        ajaxDelExpireCoupon(couponUserId);

        const couponList = this.state.couponList;
        couponList.splice(index, 1);
        this.setState({
            couponList: couponList.concat(),
        });
    }

    componentWillMount() {
        const {
            type,
        } = this.props;

        const mecouponStore = window.getStore('mecoupon');
        if (mecouponStore && mecouponStore[type]) {
            this.setState(mecouponStore[type]);
            return;
        }
        this.ajaxLoadCouponList();
    }
    
    render() {
        const {
            type,
        } = this.props;

        const {
            nextPage,
            totalPage,
            couponList,
            isFetching,
        } = this.state;

        const ItemComp = CouponTypeMap[type].ItemComp;

        return (
            <div className={classnames(classPrefix, {
                use: type === 'use',
                expired: type === 'expired', })}
            >
                {
                    <ScrollContainer
                        onlyOnce={true}
                        onBottomLoad={this.ajaxLoadCouponList}
                        style={{height: (window.innerHeight / window.lib.flexible.rem) - 2.6133 + 'rem'}}
                        className="scrollcontainer"
                    >
                        {
                            couponList.map((couponItem, index) => 
                                <ItemComp
                                    onDelTap={this.onDelTap}
                                    index={index}
                                    key={couponItem.couponUserId}
                                    couponItem={couponItem}
                                />
                            )
                        }
                        {
                            !isFetching && couponList.length === 0 ?
                                <div className="f-align-center">
                                    <img className="nocoupon-image" src={nocouponImg} alt="" />
                                    <span className="f-display-block f-align-center nocoupon-text">无相应卡券</span>
                                </div>
                                : (
                                    <div className="f-align-center nocoupon-tip">
                                        {
                                            nextPage > totalPage ?
                                                '亲，已拉到最底部~^o^~'
                                                : '正在加载...'
                                        }
                                    </div>
                                )

                        }
                    </ScrollContainer>
                }
            </div> 
        );
    }
}
