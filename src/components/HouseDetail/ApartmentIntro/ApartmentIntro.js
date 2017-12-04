import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-apartmentintro';

class ApartmentIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { className } = this.props;
        return (
            <div className={`${classPrefix} ${className}`}>
                <div className={`${classPrefix}-head`}>
                    <img src="" alt="" className={`${classPrefix}-img`} />
                    <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>蛋壳公寓</h1>
                </div>
                <div className={`${classPrefix}-intro`}>
                    <p className={`intro-text s-housedetail-introtext`}>
                        燕郊现代服务产业园启动区分产业办公区和生活配套区两部分，其中产业办公区占地188亩，总建筑面积36万平米，其中地上建筑面积22万平米，已于2015年9月全面开工，计划2017年9月交付使用，规划有5A级办公楼、高层办公、企业独栋…
                    </p>
                </div>
            </div>
        )
    }
}

export default ApartmentIntro;
