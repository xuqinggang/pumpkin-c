import React, { PureComponent } from 'react';

import './styles.less';

const classPrefix = 'm-apartmentitem';

// TODO mock data
const Mdata = {
    image: 'https://pic.kuaizhan.com/g3/d2/21/e009-03b9-46ca-861f-b1ce3e9a8f9a12?crop=1&cpos=middle&w=255&h=255',
    floorPlanCount: 5,
    RentCount: 20,
    title: '乐乎公寓立水桥店',
    price: 3500,
    location: '昌平区立水桥东小口镇中滩村105号',
};

export default class ApartmentItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {}

    render() {
        return (
            <div className={`${classPrefix}`}>
                <div>{Mdata.title}</div>
            </div>
        );
    }
}
