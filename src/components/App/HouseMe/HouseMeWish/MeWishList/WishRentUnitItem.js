import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-wishrentitem';

export default class WishRentUnitItem extends PureComponent {
    render() {
        const {
            match,
            info,
        } = this.props;

        const {
            rentUnitId,
            image,
            title,
            price,
            priceType, 
            location,
            status,
        } = info;

        const {
            url: matchUrl,
        } = match;

        const rootUrlPrefix = window.getStore('url').urlPrefix;

        return (
            <Link to={`${rootUrlPrefix}/detail/${rentUnitId}`}>
                <div className={`g-grid-row f-flex-justify-start ${classPrefix}`}>
                    <img src={image} alt="" className={`${classPrefix}-img`}/>
                    <ul className={`g-grid-col grid-col f-flex-justify-between ${classPrefix}-info`}>
                        <li className="f-singletext-ellipsis info-title">{title}</li>
                        <li className="info-price">
                            <span className="price-value">¥{price}/月</span>
                            <span className="price-label">({priceType})</span>
                        </li>
                        <li className={`g-grid-row f-flex-justify-between`}>
                            <span className="info-location">{location}</span>
                            <span className="info-status">{status}</span>
                        </li>
                    </ul>
                </div>
            </Link>
        );
    }
}
