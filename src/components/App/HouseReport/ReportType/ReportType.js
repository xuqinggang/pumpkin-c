import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const ReportTypeInfoArr = [
    {
        text: '房源不存在',
        value: 'RENTUNIT_NOT_EXISTS',
    },
    {
        text: '价格不真实',
        value: 'FAKE_PRICE',
    },
    {
        text: '图片不真实',
        value: 'FAKE_IMAGE',
    },
];

const classPrefix = 'm-reporttype';

export default class ReportType extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        };
    }

    onReportTypeItemChange = (selectedIndex) => {
        this.setState({
            selectedIndex,
        });
        this.props.onChange(ReportTypeInfoArr[selectedIndex].value);
    }

    render() {
        const {
            selectedIndex,
        } = this.state;

        return (
            <div>
                <ul>
                    {
                        ReportTypeInfoArr.map((reportTypeItem, index) => {
                            return <ReportTypeItem
                                key={index}
                                index={index}
                                isSelected={index === selectedIndex}
                                onChange={this.onReportTypeItemChange}
                            />
                        })
                    }
                </ul>
            </div>
        );
    }
}

class ReportTypeItem extends PureComponent {
    handleItemTap = () => {
        const {
            index,
            onChange,
        } = this.props;
        onChange(index);
    }

    render() {
        const {
            index,
            isSelected,
        } = this.props;

        const itemClass = classnames(`f-display-flex f-flex-align-center ${classPrefix}-item`, {
            active: isSelected,
        });

        return (
            <div className={itemClass} onTouchTap={this.handleItemTap}>
                <span className="item-text">{ ReportTypeInfoArr[index].text }</span>
                {
                    isSelected ?
                        <span className="item-icon icon-right"></span>
                        : null
                }
            </div>
        );
    }
}
