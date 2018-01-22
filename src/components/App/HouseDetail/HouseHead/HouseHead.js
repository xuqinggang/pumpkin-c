import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import PopToolTip from 'Shared/PopToolTip/PopToolTip';
import { ajaxCollectHouse, ajaxCancelCollectHouse } from 'application/App/HouseDetail/ajaxInitHouseDetail';
import { isHasCookie } from 'lib/util';

import './styles.less';

const classPrefix = 'm-househead';

export default class HouseHead extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isCollected: props.headData.isCollected || false,
        };

        const {
            match,
        } = props;

        this.curUrl = match.url;
        this.cityName = match.params.cityName;
    }

    componentWillReceiveProps(nextProps) {
        const headData = nextProps.headData;
        if (headData) {
            this.setState({
                isCollected: headData.isCollected,
            });
        }
    }

    handleCollectTap = () => {
        const isCollected = this.state.isCollected;
        this.setState({
            isCollected: !isCollected,
        });

        const {
            rentUnitId,
        } = this.props;

        if (!isCollected) {
            ajaxCollectHouse(rentUnitId)
                .then((bool) => {
                    bool && PopToolTip({text: '收藏成功'});
                })
                .catch((err) => {
                    PopToolTip({text: err.code ? err.msg : err.toString()})
                });
            return;
        }

        if (isCollected) {
            ajaxCancelCollectHouse(rentUnitId)
                .then((bool) => {
                    bool && PopToolTip({text: '取消收藏'});
                })
                .catch((err) => {
                    PopToolTip({text: err.code ? err.msg : err.toString()})
                });
            return;
        }
    }

    handleReportTap = () => {
        if (!isHasCookie('sid')) {
            this.props.history.push(`/${this.cityName}/nangua/login`);
            return;
        }
        this.props.history.push(`${this.curUrl}/report`);
    }

    render() {
        const {
            isCollected,
        } = this.state;

        const collectBtnClass = classnames(`${classPrefix}-icon`, `${classPrefix}-btn-collected`, {
            'icon-collection': !isCollected,
            'icon-collection-2': isCollected,
            'active': isCollected,
        });

        return (
            <div className={`g-grid-row f-flex-justify-between ${classPrefix}`}>
                <Link
                    className={`f-display-flex f-flex-align-center ${classPrefix}-btn-back`}
                    to={`/${this.cityName}/nangua`}>
                    <span className={`f-vertical-align ${classPrefix}-icon icon-logo`}> </span> 
                    <span className={`f-vertical-align ${classPrefix}-icon-text`}>首页</span>
                </Link>
                <div className={`f-display-flex f-flex-align-center`}>
                    <span className={collectBtnClass} onTouchTap={this.handleCollectTap}></span> 
                    <span className={`icon-report ${classPrefix}-icon ${classPrefix}-btn-report`}
                        onTouchTap={this.handleReportTap}
                    ></span>
                </div>
            </div>
        );
    }
}