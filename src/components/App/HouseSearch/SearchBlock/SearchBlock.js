/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-searchblock';

type PropType = {
    className?: string,
    title: string,
    type: string,
    onSearchItemTap: (item: recordItemType) => void,
    searchHitArr: [searchHitItemType],
};

export default class SearchBlock extends PureComponent<PropType> {
    render() {
        const {
            type,
            className,
            title,
            searchHitArr = [],
            onSearchItemTap,
        } = this.props;

        return (
            <div className={classnames(classPrefix, className)}>
                <h2 className={`${classPrefix}-title`}>{title}</h2>
                {
                    searchHitArr.map((item, index) => (
                        <SearchItem
                            onSearchItemTap={onSearchItemTap}
                            key={index}
                            item={item}
                            type={type}
                        />
                    ))
                }
            </div>
        );
    }
}

type searchItemType = {
    item: searchHitItemType,
    type: string,
    onSearchItemTap: (item: recordItemType) => void,
};

class SearchItem extends PureComponent<searchItemType> {
    // handleOtherSearchItemTap = () => {
    //     const {
    //         type,
    //         item,
    //     } = this.props;
    //     const {
    //         name,
    //         id,
    //     } = item;
    //     const paramsObj = {
    //         fieldValue: id,
    //         text: name,
    //         type,
    //     };

    //     this.props.onOtherSearchItemTap(paramsObj);
    // }

    // handlePositionSearchItemTap = () => {
    //     const {
    //         type,
    //         item,
    //     } = this.props;
    //     const {
    //         name,
    //         id,
    //         superId,
    //     } = item;

    //     const paramsObj = {
    //         type,
    //         text: name,
    //     };

    //     if (type === 'subways') {
    //         if (!superId) {
    //             Object.assign(paramsObj, {
    //                 fieldValue: id,
    //                 field: 'subwayId',
    //             });
    //         } else {
    //             Object.assign(paramsObj, {
    //                 fieldValue: id,
    //                 field: 'stationId',
    //                 superField: 'subwayId',
    //                 superFieldValue: superId,
    //             });
    //         }
    //     } else if (type === 'circles') {
    //         Object.assign(paramsObj, {
    //             fieldValue: id,
    //             field: 'circleId',
    //             superField: 'districtId',
    //             superFieldValue: superId,
    //         });
    //     } else if (type === 'districts') {
    //         Object.assign(paramsObj, {
    //             fieldValue: id,
    //             field: 'districtId',
    //         });
    //     }

    //     this.props.onPositionSearchItemTap(paramsObj);
    // }

    handleItemTap = () => {
        const {
            item,
            onSearchItemTap,
        } = this.props;

        onSearchItemTap(item);
        // switch (type) {
        //     case 'subways':
        //     case 'circles':
        //     case 'districts':
        //         this.handlePositionSearchItemTap();
        //         break;
        //     default:
        //         this.handleOtherSearchItemTap();
        // }
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
                            alt=""
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
                                dangerouslySetInnerHTML={{ __html: item.text }}
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
