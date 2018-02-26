import React, { PureComponent } from 'react';

import { Tabs, Tab } from 'Shared/Tabs'
import MeCouponList from '../MeCouponList/MeCouponList';
import { setCookie } from 'lib/util';
import { ajaxMeUseCoupon, ajaxMeExpireCoupon } from 'application/App/HouseMe/ajaxHouseMe';

import './styles.less';

const classPrefix = 'm-mecoupon';

export default class MeCoupon extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            useList: [1, 2, 3],
            expireList: [4, 5, 6],
        };
    }

    onDelExpiredCoupon = (index) => {
        const expireList = this.state.expireList;
        expireList.splice(index, 1);
        this.setState({
            expireList: expireList.concat(),
        }, () => {
            console.log('this.state', this.state.expireList);
        });
    }

    componentWillMount() {
        setCookie('sid', '2f2e42fe-46a6-4ed9-8766-cda93f415398');
        // 初始化优惠券
        ajaxMeUseCoupon()
            .then((useList) => {
                useList = [
                    {
                        "couponId" : 1,
                        "couponUserId" : 1,
                        "name" : "500元租房优惠券",
                        "code" : 12312312,
                        "ruleDesc" : "1.ad俺的沙发<br />2.asdfasdf大师傅<br />",
                        "dateEnd" : 1519272867,
                        "dateStatusCode" : 0,
                        "type" : 0,
                        "quota" : 500,
                        "statusCode" : 1
                    },
                    {
                        "couponId" : 1,
                        "couponUserId" : 1,
                        "name" : "1000元租房优惠券",
                        "code" : 12312312,
                        "ruleDesc" : "1.ad俺的沙发/n2.asdfasdf大师傅<br />",
                        "dateEnd" : 1519272867,
                        "dateStatusCode" : 0,
                        "type" : 0,
                        "quota" : 500,
                        "statusCode" : 1
                    }
                ];

                this.setState({
                    useList,
                });

                window.setStore({
                    useList,
                });
            })
        // ajaxMeExpireCoupon()
        //     .then((expireCouponList) => {

        //     })
    }

    render() {
        const {
            useList,
            expireList,
        } = this.state;

        return (
            <div className={classPrefix} style={{minHeight: (window.innerHeight - 88) + 'px'}}>
                <Tabs
                    isBar={true}
                    className={`${classPrefix}-tabs`}
                    navClassName={`${classPrefix}-nav`}
                    barClassName={`${classPrefix}-bar`}
                    contentClassName={`${classPrefix}-content`}
                >
                    <Tab label='待使用' navItemClass={`${classPrefix}-navitem`}>
                        <MeCouponList type="use" couponList={useList} />
                    </Tab>
                    <Tab label='已失效' navItemClass={`${classPrefix}-navitem`}>
                        <MeCouponList type="expired" onDelTap={this.onDelExpiredCoupon} couponList={expireList}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
