import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { isWeiXin } from 'lib/const';

import './styles.less';

const classPrefix = 'm-apartmenthead';

export default class ApartmentHead extends PureComponent {
    constructor(props) {
        super(props);
    
        const rootUrlPrefix = window.getStore('url').urlPrefix;
        // 筛选url片段
        const urlInfo = window.getStore('url');
        const filterUrlFragment = urlInfo && urlInfo.filterUrlFragment || '';
        // 目前返回默认是房源列表页
        this.backUrl = `${rootUrlPrefix}/${filterUrlFragment}`;

    }

    componentWillMount() {

    } 

    render() {
        return (
            <div className={`g-grid-row f-flex-justify-between ${classPrefix}`}>
                <div className={'f-display-flex f-flex-align-center'}>
                    <Link
                        className={`f-display-flex f-flex-align-center ${classPrefix}-btn-back`}
                        to={this.backUrl}>
                        <span
                            className={`icon-back`}
                        >
                        </span>                    
                    </Link>
                    <span className={`${classPrefix}-title`}>集中式公寓</span>
                </div>
            </div>
        );
    }
}
