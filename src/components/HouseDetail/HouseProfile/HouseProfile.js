import React, { Component } from 'react';
import classnames from 'classnames';
import { Tabs, Tab } from 'Shared/Tabs';

import './styles.less';

const classPrefix = 'm-houseprofile';

class HouseProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: ['首次出租', '独立卫浴', '集中供暖'],
            brief: ['3.8平', '3室2厅', '5/20层', '南北'],
        };
    }
    renderTags() {
        const tags = this.state.tags || [];
        return tags.map((tag, index) => {
            return (
                <li key={index}>
                    <span className={`u-tag-gray`}>{tag}</span>
                </li>
            );
        });
    }
    renderBrief() {
        const brief = this.state.brief || [];
        return brief.map((info, index) => {
            return (
                <li key={index}>
                    <span className={`u-tag-gray`}>{info}</span>
                </li>
            );
        })
    }
    render() {
        const profileClass = classnames(`${classPrefix}`);
        return (
            <div className={profileClass}>
                <div className={`${classPrefix}-title`}>
                    <h1>￥6740/月</h1>
                    <h2>有家整租·海淀路小区2室1厅</h2>
                    <h3>海淀-海淀路小区-距10号线知春里站1200米</h3>
                </div>
                <div className={`${classPrefix}-tags`}>
                    <ul>
                        { this.renderTags() }
                    </ul>
                </div>
                <div className={`${classPrefix}-brief`}>
                </div>
                <div>
                <Tabs>
                    <Tab label="123" order={0}>
                        123
                    </Tab>
                    <Tab label="456" order={1}>
                        124
                    </Tab>
                </Tabs>
                    
                </div>
            </div>
        )
    }
}
export default HouseProfile;
