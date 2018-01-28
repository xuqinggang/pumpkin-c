import React, { PureComponent } from 'react';

// 业务组件
import IndexHead from 'components/App/HouseIndex/IndexHead/IndexHead';
import IndexBanner from 'components/App/HouseIndex/IndexBanner/IndexBanner';
import IndexRecommend from 'components/App/HouseIndex/IndexRecommend/IndexRecommend';
import HeadTitle from 'components/App/HouseList/HeadTitle/HeadTitle';
import HouseLists from 'components/App/HouseList/HouseLists';
import Filter from 'components/App/HouseList/Filter/Filter';
import BottomOpenNative from 'Shared/BottomOpenNative/BottomOpenNative';

import { stringifyStateObjToUrl, parseUrlToState } from './filterStateToUrl';
import { filterStateToParams } from './filterStateToParams';
import Service from 'lib/Service';
import { shallowEqual, dynamicDocTitle, urlJoin } from 'lib/util';
import { isApp } from 'lib/const';
import { execWxShare } from 'lib/wxShare';

import './styles.less';

const classPrefix = 'g-houselist';

export default class HouseList extends PureComponent {
    constructor(props) {
        super(props);

        this.getParamsObj = this._getGetParams();
        this.state = {
            // 4个筛选面板的state
            filterLabel: {
                position: '位置',
                rent: '租金',
                houseType: '房型',
                more: '更多',
            },
            // 筛选状态
            filterState: {
                position: {},
                rent: [],
                houseType: {},
                more: {},
            },
            // 筛选的请求参数
            filterParamsObj: {
                apartmentId: this.getParamsObj.apartment || null,
            },
        };
        // 动态更改标题
        dynamicDocTitle('南瓜租房');

        this.curUrlPrefix = window.getStore('url').urlPrefix;
    }

    _getGetParams() {
        const getParamsObj = {};
        const url = decodeURIComponent(window.location.href);
        const pt = url.indexOf('?');
        if (pt === -1) return getParamsObj;
        const getParamsArr = url.substr(pt+1).split('&');
        getParamsArr.forEach((paramStr) => {
            if (!paramStr) return;
            const keyAndValueArr = paramStr.split('=');
            getParamsObj[keyAndValueArr[0]] = keyAndValueArr[1];
        });

        return getParamsObj;
    }

    // 由于位置筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label
    _dynamicSetPositionFilterLabel = (label) => {
        console.log('_dynamicSetPositionFilterLabel', label)
        this.setState({
            filterLabel: Object.assign({}, this.state.filterLabel, { position: label }),
        });
    }

    // 筛选确认回调
    onFilterConfirm = (filterStateObj) => {
        const oldFilterState = this.state.filterState;
        const newFilterState = Object.assign({}, oldFilterState, filterStateObj);

        this.setState({
            filterState: newFilterState,
        });

        console.log('test onFilterConfirm', newFilterState);

        const filterUrlFragment = stringifyStateObjToUrl(newFilterState);
        let link = '';

        // 筛选url片段
        const rtFilterUrl = this._genHouseListFilterUrlFragment(filterUrlFragment);
        link = urlJoin(this.curUrlPrefix, rtFilterUrl);

        this.props.history.push(link);
        // 未知原因，需要设置延时来确保微信分享正常
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.wxShare();
        }, 500);
        
        // const newFilterParams = Object.assign({}, this.state.filterParamsObj, filterParams);

        // if (!shallowEqual(this.state.filterParamsObj, newFilterParams)) {
        //     this.setState({
        //         filterParamsObj: newFilterParams,
        //     }, () => {
        //         const filterUrlFragment = stringifyStateObjToUrl(filterStateObj);
        //         if (filterUrlFragment) {
        //             let link = '';

        //             // 筛选url片段
        //             const rtFilterUrl = this._genHouseListFilterUrlFragment(filterUrlFragment);
        //             console.log('rtFilterUrl', rtFilterUrl);
        //             link = urlJoin(this.curUrlPrefix, rtFilterUrl);

        //             this.props.history.push(link);
        //             // 未知原因，需要设置延时来确保微信分享正常
        //             const timer = setTimeout(() => {
        //                 clearTimeout(timer);
        //                 this.wxShare();
        //             }, 500);
        //         }
        //     });
        // }
    }
    // 生成列表页筛选url片段，包括apartment查询字符串
    _genHouseListFilterUrlFragment(filterUrlFragment) {
        let rt = '';
        if (this.getParamsObj.apartment) {
            rt = `${filterUrlFragment}?apartment=${this.getParamsObj.apartment}`;
        } else {
            rt = filterUrlFragment;
        }

        window.setStore('url', {
            filterUrlFragment: rt,
        });

        return rt;
    }

    // 根据url片段生成state和params
    _genStateAndParamsByFilterUrlFragment(filterUrlFragment) {
        const filterState = parseUrlToState(filterUrlFragment);
        // filterState中 position包含 state和params信息
        const { position: positionStateAndParams, ...extraTypeFilterState } = filterState;
        const newFilterState = { ...extraTypeFilterState, position: positionStateAndParams && positionStateAndParams.state };
        console.log('newFilterState', newFilterState);
        const filterParamsAndLabel = filterStateToParams(newFilterState);

        if (filterState) {
            this.setState({
                filterState: Object.assign({}, this.state.filterState, newFilterState),
                filterParamsObj: Object.assign({},
                    this.state.filterParamsObj,
                    filterParamsAndLabel.filterParams,
                    positionStateAndParams && positionStateAndParams.params,
                ),
                filterLabel: Object.assign({}, this.state.filterLabel, filterParamsAndLabel.label),
            });
        }
    }

    wxShare() {
        // 分享
        execWxShare({
            title: '上南瓜租房，找品牌公寓',
            link: window.location.href.split('#')[0],
            imgUrl: 'https://pic.kuaizhan.com/g3/42/d4/5a65-2d67-4947-97fd-9844135d1fb764/imageView/v1/thumbnail/200x200',
            desc: '南瓜租房，只租真房源！',
        });
    }

    componentWillMount() {
        const filterUrlFragment = this.props.match.params.filterUrlFragment;
        this._genHouseListFilterUrlFragment(filterUrlFragment);

        this._genStateAndParamsByFilterUrlFragment(filterUrlFragment);
        this.wxShare();
    }

    componentWillReceiveProps(nextProps) {
        const curFilterUrlFragment = this.props.match.params.filterUrlFragment;
        const nextFilterUrlFragment = nextProps.match.params.filterUrlFragment;
        if (curFilterUrlFragment !== nextFilterUrlFragment) {
            console.log('componentWillReceiveProps', nextFilterUrlFragment, curFilterUrlFragment);
            this._genStateAndParamsByFilterUrlFragment(nextFilterUrlFragment);

            this._genHouseListFilterUrlFragment(nextFilterUrlFragment);
        }
    }

    render() {
        const {
            filterState,
            filterLabel,
            filterParamsObj,
        } = this.state;

        const {
            match,
            history,
        } = this.props;
        console.log('HouseList render', filterState);

        return (
            <div className={`${classPrefix}`}>
                <div className={`${classPrefix}-head`}>
                    <IndexHead match={match} history={history} />
                </div>
                <IndexBanner />
                <IndexRecommend />
                <Filter
                    className="filter"
                    filterState={filterState}
                    filterLabel={filterLabel}
                    onFilterConfirm={this.onFilterConfirm}
                    onFilterClear={this.onFilterClear}
                    onFilterReSume={this.onFilterReSume}
                    onDynamicSetLabel={this._dynamicSetPositionFilterLabel}
                />
                <HouseLists
                    filterParams={filterParamsObj}
                />
                <BottomOpenNative
                    schema={`api.nanguazufang.cn/main?rentUnitFilter=${JSON.stringify(filterParamsObj)}`}
                />
            </div>
        );
    }
}
