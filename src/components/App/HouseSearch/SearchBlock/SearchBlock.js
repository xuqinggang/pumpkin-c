/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-searchblock';

type PropType = {
    className?: string,
    title: string,
    type: string,
    onTap: () => void,
    searchDataArr: Array<{
        id: number,
        image?: string,
        iconClass?: string,
        name: string,
        subName?: string,
        count: number,
    }>,
};

export default class SearchBlock extends PureComponent<PropType> {
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
                    searchDataArr.map((item, index) => <SearchItem item={item} key={index} type={type} />)
                }
            </div>
        );
    }
}

class SearchItem extends PureComponent {
    handleOthersItemTap = () => {
        const {
            type,
            item,
        } = this.props;
        const {
            name,
            id,
        } = item;
        const paramsObj = {
            id: id,
            text: name, 
            type,
        };
    }
    handlePositionItemTap = () => {
        const {
            type,
            item,
        } = this.props;
        const {
            name,
            id,
            superId,
        } = item;

        const paramsObj = {
            text: name,
        };

        if (type === 'subways') {
            if (!superId) {
                Object.assign(paramsObj, {
                    fieldValue: id,
                    field: 'subwayId',
                });
            } else {
                Object.assign(paramsObj, {
                    fieldValue: id,
                    field: 'stationId',
                    superField: 'subwayId',
                    superFieldValue: superId,
                });
            }
        } else if (type === 'circles') {
            Object.assign(paramsObj, {
                fieldValue: id,
                field: 'circleId',
                superField: 'districtId',
                superFieldValue: superId,
            });
        } else if (type === 'districts') {
            Object.assign(paramsObj, {
                fieldValue: id,
                field: 'districtId',
            });
        }
    }
    handleItemTap = () => {
        const {
            type,
            item,
        } = this.props;

        switch (type) {
            case 'subways':
            case 'circles':
            case 'districts':
                this.handlePositionItemTap();
                break;
            default:
                this.handleOthersItemTap();
        }
    }
    
    render() {
        const {
            item,
            type,
        } = this.props;

        return (
            <div
                onTouchTap={this.handleItemTap}
                className={`g-grid-row f-flex-align-center ${classPrefix}-item`}
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
        );
    }
}
