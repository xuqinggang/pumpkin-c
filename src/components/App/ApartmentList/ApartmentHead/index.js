import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.less';

const classPrefix = 'm-apartmenthead';

class ApartmentHead extends PureComponent {
    constructor(props) {
        super(props);
    
        const rootUrlPrefix = window.getStore('url').urlPrefix;
        // 筛选url片段
        const urlInfo = window.getStore('url');
        const filterUrlFragment = urlInfo && urlInfo.filterUrlFragment || '';
        // 目前返回默认是房源列表页
        this.backUrl = `${rootUrlPrefix}/${filterUrlFragment}`;

    }

    render() {
        const { title } = this.props;

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
                    <span className={`${classPrefix}-title`}>{title}</span>
                </div>
            </div>
        );
    }
}

ApartmentHead.defaultProps = {
    title: '集中式公寓',
};

ApartmentHead.propTypes = {
    title: PropTypes.string,
};

export default ApartmentHead;