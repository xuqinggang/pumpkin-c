import React, { Component } from 'react';
import { Tabs, Tab } from 'Shared/Tabs'

import './styles.less';
const positionData = {
    area: {
        itemArr: [
            {
                text: '不限'
            },
            {
                text: '海淀',
                itemArr: [
                    {
                        text: '不限',
                    },
                    {
                        text: '双榆树',
                    },
                    {
                        text: '中关村',
                    },
                    {
                        text: '五道口',
                    },
                ]
            },
            {
                text: '丰台',
                itemArr: [
                    {
                        text: '不限',
                    },
                    {
                        text: '双榆树2',
                    },
                    {
                        text: '中关村2',
                    },
                    {
                        text: '五道口2',
                    },
                ]
            },
        ]
    },
    // subway: {

    // },
    // around: {

    // },
};
const ptClass = 'm-ptfilter';

export default class PositionFilter extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <div>
                test
                <Tabs
                    defaultActiveIndex={0}
                    className={ptClass}
                    navClassName={`${ptClass}-nav`}
                    contentClassName={`${ptClass}-content`}
                >
                    {
                        // Object.keys(positionData).map(())
                    }
                    <Tab 
                        label="123"
                        order={0}
                        navItemClass={`${ptClass}-nav-item`}
                        contentItemClass={`${ptClass}-content-item`}
                    >
                        <Tabs defaultActiveIndex={-1}
                            navClassName={`${ptClass}-nav`}
                            contentClassName={`${ptClass}-content`}
                        >
                            <Tab
                                label="child1"
                                order={0}
                                navItemClass={`${ptClass}-nav-item`}
                                contentItemClass={`${ptClass}-content-item`}
                            >
                                child1
                            </Tab>                            
                            <Tab
                                label="child2"
                                order={0}
                                navItemClass={`${ptClass}-nav-item`}
                                contentItemClass={`${ptClass}-content-item`}
                            >
                                child2
                            </Tab>                            
                        </Tabs>
                    </Tab>
                    <Tab label="456" order={1} className={`${ptClass}-item`}>
                        456
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
