import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { ajaxInitHouseIndexBanner } from 'application/App/HouseIndex/ajaxInitHouseIndex';

import './styles.less';

const classPrefix = 'm-indexbanner';

export default class IndexBanner extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            indexBannerData: {},
        };
    }

    componentWillMount() {
        const houseIndexData = window.getStore('houseIndex');

        // 如果存在数据，则不请求
        if (houseIndexData && houseIndexData.indexBannerData) {
            this.setState({
                indexBannerData: houseIndexData.indexBannerData,
            });

            return;
        }

        ajaxInitHouseIndexBanner()
            .then((indexBannerData) => {
                this.setState({
                    indexBannerData,
                });

                window.setStore('houseIndex', {
                    indexBannerData,
                });
            });
    }

    render() {
        const {
            url,
            avatar,
        } = this.state.indexBannerData;

        return (
            <div className={classnames(classPrefix)}>
                <a className={`f-display-inlineblock ${classPrefix}-img-wrap`} href={url}>
                    <img className={`f-display-inlineblock ${classPrefix}-img`} src={avatar} alt="" />
                </a>
            </div>
        );
    }
}
