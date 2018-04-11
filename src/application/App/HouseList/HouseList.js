import React, { PureComponent } from 'react';

// 业务组件
import IndexHead from 'components/App/HouseIndex/IndexHead/IndexHead';
import IndexBanner from 'components/App/HouseIndex/IndexBanner/IndexBanner';
import IndexRecommend from 'components/App/HouseIndex/IndexRecommend/IndexRecommend';
import HeadTitle from 'components/App/HouseList/HeadTitle/HeadTitle';
import HouseLists from 'components/App/HouseList/HouseLists';
import Filter from 'components/App/HouseList/Filter/Filter';
import BottomOpenNative from 'Shared/BottomOpenNative/BottomOpenNative';
import CommentCard from 'components/App/Comment/CommentCard';

import { stringifyStateObjToUrl, parseUrlToState } from './filterStateToUrl';
import { filterStateToParams } from './filterStateToParams';
import Service from 'lib/Service';
import { shallowEqual, urlJoin, parseUrlParams } from 'lib/util';
import { isApp } from 'lib/const';
import { execWxShare } from 'lib/wxShare';
import { kzPv } from 'lib/pv';

import './styles.less';

const classPrefix = 'g-houselist';

export default class HouseList extends PureComponent {
    constructor(props) {
        super(props);

        const {
            urlParamsObj,
            urlQuery,
        } = parseUrlParams();
        this.urlQuery = urlQuery;
        this.urlParamsObj = urlParamsObj;

        window.setStore('url', {
            urlParamsObj,
            urlQuery,
        });

        this.state = {
            // 4个筛选面板的state
            filterLabel: {
                position: '位置',
                rent: '租金',
                houseType: '房型',
                more: '更多',
            },
            // 筛选初始状态
            filterState: {
                position: {},
                rent: [0, 20000],
                houseType: {},
                more: {},
            },
            // 筛选的请求参数
            filterParamsObj: {
                apartmentId: this.urlParamsObj.apartment || null,
            },
        };
        // 动态更改标题
        // dynamicDocTitle('南瓜租房');

        this.urlPrefix = window.getStore('url').urlPrefix;

        console.log('con HouseList', this.urlParamsObj.apartment);
    }

    // 由于位置筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label
    _dynamicSetPositionFilterLabel = (label) => {
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

        const filterUrlFragment = stringifyStateObjToUrl(newFilterState);
        this._setStoreFilterUrlFragment(filterUrlFragment);
        let link = '';

        // 筛选url片段
        link = urlJoin(this.urlPrefix, 'list', filterUrlFragment) + `?${this.urlQuery}`;

        this.props.history.push(link);
        // 未知原因，需要设置延时来确保微信分享正常
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.wxShare();
        }, 500);
    }

    _setStoreFilterUrlFragment(filterUrlFragment) {
        window.setStore('url', {
            filterUrlFragment,
        });
    }

    // 根据url片段生成state和params
    _genStateAndParamsByFilterUrlFragment(filterUrlFragment) {
        const filterState = parseUrlToState(filterUrlFragment);
        // filterState中 position包含 state和params信息
        const { position: positionStateAndParams, ...extraTypeFilterState } = filterState;
        const newFilterState = { ...extraTypeFilterState, position: positionStateAndParams && positionStateAndParams.state };
        const filterParamsAndLabel = filterStateToParams(newFilterState);

        this.setState({
            filterState: Object.assign({}, this.state.filterState, newFilterState),
            filterParamsObj: Object.assign({},
                this.state.filterParamsObj,
                filterParamsAndLabel.filterParams,
                positionStateAndParams && positionStateAndParams.params,
            ),
            filterLabel: Object.assign({}, this.state.filterLabel, filterParamsAndLabel.label),
        }, () => {
            window.setStore('filter', this.state);
        });
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
        this._setStoreFilterUrlFragment(filterUrlFragment);

        const filterStore = window.getStore('filter');
        if (filterStore) {
            this.setState(filterStore);
        } else {
            this._genStateAndParamsByFilterUrlFragment(filterUrlFragment);
        }
    }

    componentDidMount() {
        this.wxShare();

        if (this.urlParamsObj.daili) {
            kzPv(this.urlParamsObj.daili, 'nangua_daili_list');
        }
    }

    componentWillReceiveProps(nextProps) {
        const curFilterUrlFragment = this.props.match.params.filterUrlFragment;
        const nextFilterUrlFragment = nextProps.match.params.filterUrlFragment;
        if (curFilterUrlFragment !== nextFilterUrlFragment) {

            this._genStateAndParamsByFilterUrlFragment(nextFilterUrlFragment);

            // 每生成一个新的url发送一次pv请求
            window.send_stat_pv && window.send_stat_pv();
        }
    }

    render() {
        console.log('HouseList, render', this.state.filterParamsObj);
        const {
            filterState,
            filterLabel,
            filterParamsObj,
        } = this.state;

        const {
            match,
            history,
        } = this.props;

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
                <div className={`${classPrefix}-comment`}>
                    <CommentCard />
                </div>
                <HouseLists
                    filterParams={filterParamsObj}
                />
                {
                    isApp() ?
                        null :
                        <BottomOpenNative
                            schema={`api.nanguazufang.cn/main?rentUnitFilter=${JSON.stringify(filterParamsObj)}`}
                        />
                }
            </div>
        );
    }
}
