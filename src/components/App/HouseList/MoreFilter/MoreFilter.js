import React, { Component } from 'react';
import { directionTagsArr, featureTagsArr, areaTagsArr, floorTagsArr } from './tags';
import Tags from 'Shared/Tags/Tags';

import './styles.less';

const houseTypeClass = 'm-morefilter';

export default class MoreFilter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${houseTypeClass}`}>
                <div className={`${houseTypeClass}-direction`}>
                    <h1 className={`${houseTypeClass}-title`}>朝向</h1>
                    <Tags tagsArr={directionTagsArr} itemClass={`${houseTypeClass}-item direction-item`} />
                </div>
                <div className={`${houseTypeClass}-feature`}>
                    <h1 className={`${houseTypeClass}-title`}>标签</h1>
                    <Tags tagsArr={featureTagsArr} itemClass={`${houseTypeClass}-item feature-item`} />
                </div>
                <div className={`${houseTypeClass}-area`}>
                    <h1 className={`${houseTypeClass}-title`}>面积</h1>
                    <Tags tagsArr={areaTagsArr} itemClass={`${houseTypeClass}-item area-item`} />
                </div>
                <div className={`${houseTypeClass}-floor`}>
                    <h1 className={`${houseTypeClass}-title`}>楼层</h1>
                    <Tags tagsArr={floorTagsArr} itemClass={`${houseTypeClass}-item floor-item`} />
                </div>
            </div>
        );
    }
}
