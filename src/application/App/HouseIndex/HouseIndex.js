import React, { PureComponent } from 'react';

import IndexHead from 'components/App/HouseIndex/IndexHead/IndexHead';
import IndexBanner from 'components/App/HouseIndex/IndexBanner/IndexBanner';
import IndexRecommend from 'components/App/HouseIndex/IndexRecommend/IndexRecommend';
import { 
    ajaxInitHouseIndexBanner,
    ajaxInitHouseIndexRecommend 
} from 'application/App/HouseIndex/ajaxInitHouseIndex';

import './styles.less';

export default class HouseIndex extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            indexBannerData: null,
            indexRecommendData: null,
        };
    }

    componentWillMount() {
        ajaxInitHouseIndexBanner()
            .then((indexBannerData) => {
                this.setState({
                    indexBannerData,
                });
            });
        ajaxInitHouseIndexRecommend()
            .then((indexRecommendData) => {
                this.setState({
                    indexRecommendData,
                });
            })
    }

    render() {
        const {
            indexBannerData,
            indexRecommendData,
        } = this.state;

        return (
            <div>
                <IndexHead />
                <IndexBanner data={indexBannerData || {}} />
                <IndexRecommend data={indexRecommendData || []} />
            </div>
        );
    }
}
