import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import PopToolTip from 'Shared/PopToolTip/PopToolTip';
import { ajaxCollectHouse, ajaxCancelCollectHouse } from 'application/App/HouseDetail/ajaxInitHouseDetail';
import { isHasCookie, getPageFrom, urlJoin } from 'lib/util';
import { isWeiXin } from 'lib/const';

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

        const urlStore = window.getStore('url');
        this.rootUrlPrefix = urlStore && urlStore.urlPrefix;

        const search = props.history.location.search;
        // 来自哪个页面
        this.pageFrom = getPageFrom(search);
        
        // 判断是否来自客户端的分享
        this.isShareFrom = search.indexOf('sharefrom') !== -1;

        // 是否是从微信浏览器打开
        this.isFrom = search.indexOf('from') !== -1;

        // 筛选url片段
        this.filterUrlFragment = urlStore && urlStore.filterUrlFragment || '';
        this.urlQuery = urlStore && urlStore.urlQuery || '';
    }

    componentWillReceiveProps(nextProps) {
        const headData = nextProps.headData;
        if (headData) {
            this.setState({
                isCollected: headData.isCollected,
            });
        }
    }

    // 是否收藏
    _collectHouse(isCollected) {
        const {
            rentUnitId,
        } = this.props;
        
        this.setState({
            isCollected,
        });
        
        const houseDetailStore = window.getStore('houseDetail');
        const curHouseDetailData = houseDetailStore && houseDetailStore[rentUnitId];
        curHouseDetailData && window.setStore('houseDetail', {
            [rentUnitId]: {
                ...curHouseDetailData,
                headData: { isCollected, },
            },
        });
    }

    handleCollectTap = () => {
        if (!isHasCookie('sid')) {
            this.props.history.push(urlJoin(this.rootUrlPrefix, 'login')+`?pagefrom=detail`);
            return;
        }
        
        const isCollected = this.state.isCollected;

        const {
            rentUnitId,
        } = this.props;

        if (!isCollected) {
            ajaxCollectHouse(rentUnitId)
                .then((bool) => {
                    this._collectHouse(true);

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
                    this._collectHouse(false);
                    
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
            this.props.history.push(urlJoin(this.rootUrlPrefix, 'login')+`?pagefrom=detail`);
            return;
        }

        this.props.history.push(urlJoin(this.curUrl, 'report'));
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
                {
                    this.isShareFrom || this.pageFrom === 'login' || isWeiXin || this.isFrom ? (
                        <Link
                            className={`f-display-flex f-flex-align-center ${classPrefix}-btn-back`}
                            to={urlJoin(this.rootUrlPrefix, 'list', this.filterUrlFragment) + `?${this.urlQuery}`}>
                            <span className={`f-vertical-align ${classPrefix}-icon icon-logo`}> </span> 
                            <span className={`f-vertical-align ${classPrefix}-icon-text`}>首页</span>
                        </Link>
                    )
                    : (
                        <a
                            href="javascript:history.back();"
                            className={`f-display-flex f-flex-align-center icon-back ${classPrefix}-btn-back-browser`}
                        >
                        </a>
                    )
                }
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
