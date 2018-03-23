/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-searchitem';

type PropType = {
    className?: string,
    title: string,
    type: string,
    searchDataArr: Array<{
        id: number,
        image?: string,
        iconClass?: string,
        name: string,
        subName?: string,
        count: number,
    }>,
};

export default class SearchItem extends PureComponent<PropType> {
    render() {
        const {
            type,
            className,
            title,
            searchDataArr = [],
        } = this.props;

        return (
            <div className={classnames(classPrefix, className)}>
                <h2 className={`${classPrefix}-title`}>{title}</h2>
                {
                    searchDataArr.map((item, index) => (
                        <div
                            className={`g-grid-row f-flex-align-center ${classPrefix}-item`}
                            key={index}
                        >
                            {
                                type === 'apartments' ?
                                    <img
                                        src={item.image}
                                        className="item-icon"
                                    /> :
                                    <span className={classnames('item-icon', item.iconClass)} />
                            }
                            <ul className="g-grid-row grid-col f-flex-justify-between f-flex-align-center item-right">
                                <li className="g-grid-row f-flex-align-center">
                                    <div className="f-display-inlineblock">
                                        <span
                                            className="item-name"
                                            dangerouslySetInnerHTML={{__html: item.name}}
                                        />
                                        <span className="item-subname">{item.subName}</span>
                                    </div>
                                </li>
                                <li className="item-num">
                                    {item.count}套
                                </li>
                            </ul>
                        </div>
                    ))
                }
            </div>
        );
    }
}
