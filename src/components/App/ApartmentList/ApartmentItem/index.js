import React, { PureComponent } from 'react';

import './styles.less';

const classPrefix = 'm-apartmentitem';

// TODO mock data
const Mdata = {
    image: 'https://pic.kuaizhan.com/g3/d2/21/e009-03b9-46ca-861f-b1ce3e9a8f9a12?crop=1&cpos=middle&w=255&h=255',
    floorPlanCount: 5,
    rentCount: 20,
    title: '乐乎公寓立水桥店',
    price: 3500,
    location: '昌平区立水桥东小口镇中滩村105号',
};

export default class ApartmentItem extends PureComponent {
    render() {
        return (
            <div className={`${classPrefix}`}>
                <div className={`${classPrefix}-image`}>
                    <img src={Mdata.image} alt="优质公寓" />
                    <div className={'tip'}>
                        <span>户型/{Mdata.floorPlanCount}个</span>
                        <span>可租/{Mdata.rentCount}套</span>
                    </div>
                </div>
                <div className={`g-grid-row f-flex-justify-between ${classPrefix}-title-price`}>
                    <span className={`${classPrefix}-title`}>{Mdata.title}</span>
                    <span className={`${classPrefix}-price`}>{Mdata.price}
                        <span className={`${classPrefix}-unit`}>元/月</span>
                    </span>
                </div>
                <div>
                    <span className={'icon-region'} />
                    <span>{Mdata.location}</span>
                </div>
            </div>
        );
    }
}
