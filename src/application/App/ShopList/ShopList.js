import React, { PureComponent } from 'react';
import classnames from 'classnames';

import {
    ShopFilter,
    PureShopListWrap,
} from 'components/App/ShopList';
import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';

import { stateToParams } from './stateToParams';
import { stringifyStateObjToUrl, parseUrlToState } from './stateToUrl';
import { execWxShare } from 'lib/wxShare';
import { dynamicDocTitle, urlJoin, parseUrlParams } from 'lib/util';
import { isRmHead, isNanguaApp } from 'lib/const';
import { postRouteChangToIOS } from 'lib/patchNavChangeInIOS';
import { AbbrevMapCity } from 'config/config';

import './styles.less';

const classPrefix = 'g-shoplist';

const isSimulateNative = () => isRmHead() && isNanguaApp();

export default class ShopList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 2个筛选面板的state
            filterLabel: {
                position: '位置',
                brand: '品牌',
            },
            // 筛选初始状态
            filterState: {
                position: {},
                brand: {},
            },
            filterParamsObj: {}
        };

        // TODO REMOVE SOME 样板代码
        const {
            urlParamsObj,
            urlQuery,
        } = parseUrlParams();
        this.urlQuery = urlQuery;
        this.urlParamsObj = urlParamsObj;
        this.urlPrefix = window.getStore('url').urlPrefix;

        // 目前的情况比较单纯，可以认为在这页就会跳出 webview 页
        if (isSimulateNative()) {
            postRouteChangToIOS({
                canGoBack: false,
                url: window.location.href
            });
        }

    }

    componentDidMount() {
        this.wxShare();
        dynamicDocTitle('南瓜租房');
    }

    componentWillMount() {
        // store filterUrlFragment for easy get
        const filterUrlFragment = this.props.match.params.filterUrlFragment;
        this._setStoreFilterUrlFragment(filterUrlFragment);

        const filterStore = window.getStore('apartmentFilter');
        if (filterStore) {
            this.setState(filterStore);
        } else {
            this._genStateAndParamsByFilterUrlFragment(filterUrlFragment);
        }
    }

    componentWillReceiveProps(nextProps) {
        const curFilterUrlFragment = this.props.match.params.filterUrlFragment;
        const nextFilterUrlFragment = nextProps.match.params.filterUrlFragment;
        if (curFilterUrlFragment !== nextFilterUrlFragment) {
            // 每生成一个新的url发送一次pv请求
            window.send_stat_pv && window.send_stat_pv();
        }
    }

    _setStoreFilterUrlFragment = (filterUrlFragment) => {
        window.setStore('url', {
            filterUrlFragment,
        });
    }

    // 由于位置筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label
    dynamicSetPositionFilterLabel = (label) => {
        this.setState({
            filterLabel: Object.assign({}, this.state.filterLabel, { position: label }),
        });
    }
    // 公寓品牌可能经常变化，所以无法用搜索固定位置
    // 由于品牌筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label 和 state
    dynamicSetBrandFilterLabelAndState = (state, label) => {
        this.setState({
            filterLabel: {
                ...this.state.filterLabel,
                brand: label,
            }
        });
        this.setState({
            filterState: {
                ...this.state.filterState,
                brand: state
            }
        })
    }

    onFilterConfirm = (newState) => {
        const { filterState, filterLabel, filterParamsObj } = this.state;

        const querys = stateToParams(newState, filterParamsObj, filterLabel);

        // new filter state
        const newFilterState = {
            ...filterState,
            ...newState,
        };
        const newParams = querys.params;
        const newLabel = querys.label;
        this.setFilterStateAndStore(newFilterState, newParams, newLabel);

        // filter state to url
        const filterUrlFragment = stringifyStateObjToUrl(newFilterState, newParams);
        const link = urlJoin(this.urlPrefix, 'shop/list', filterUrlFragment) + `?${this.urlQuery}`;
        this.props.history.push(link);
    }

    

    // 根据 url 片段生成state和params
    _genStateAndParamsByFilterUrlFragment(filterUrlFragment) {

        const filterState = parseUrlToState(filterUrlFragment);
        // filterState中 position包含 state和params信息
        const { position: positionStateAndParams, brand: brandParams } = filterState;
        const newFilterState = {
            position: positionStateAndParams && positionStateAndParams.state 
        };
        const newParams = { 
            position: positionStateAndParams && positionStateAndParams.params, 
            apartmentIds: brandParams && brandParams.params,
        }

        this.setFilterStateAndStore(newFilterState, newParams)
    }

    setFilterStateAndStore = (newFilterState={}, newParams={}, newLabel={}) => {
        const { filterState, filterLabel, filterParamsObj } = this.state;
        const filter = {
            ...this.state,
            filterState: {
                ...filterState,
                ...newFilterState
            },
            filterParamsObj: {
                ...filterParamsObj,
                ...newParams
            },
            filterLabel: {
                ...filterLabel,
                ...newLabel
            },
        };

        window.setStore('apartmentFilter', filter);
        this.setState(filter);
    }
    

    wxShare() {
        const urlStore = window.getStore('url');
        const cityName = urlStore.cityName;
        const cityText = AbbrevMapCity[cityName].text;

        // 分享
        execWxShare({
            title: `${cityText} - 品质生活独栋公寓`,
            link: window.location.href.split('#')[0],
            imgUrl: 'https://pic.kuaizhan.com/g3/42/d4/5a65-2d67-4947-97fd-9844135d1fb764/imageView/v1/thumbnail/200x200',
            desc: '生活不止眼前的苟且，还有诗和远方，快来这里看看高品质的集中式公寓吧。',
        });
    }

    render() {
        const { history } = this.props;

        const {
            filterState,
            filterLabel,
            filterParamsObj,
        } = this.state;

        const listClass = classnames(
            `${classPrefix}-padding-top`,
            {
                [`${classPrefix}-no-head`]: isRmHead(),
            }
        )

        return (
            <div className={`${classPrefix}`}>
                <div className={`${classPrefix}-fixed-top`}>
                    {
                        !isRmHead() ?
                        <HouseHead type="apartment" title="集中式公寓" history={history} /> : 
                        null
                    }
                    <ShopFilter
                        className="apartmentfilter"
                        filterState={filterState}
                        filterLabel={filterLabel}
                        onFilterConfirm={this.onFilterConfirm}
                        onFilterClear={this.onFilterClear}
                        onFilterReSume={this.onFilterReSume}
                        onDynamicSetLabel={this.dynamicSetPositionFilterLabel}
                        onDynamicSetBrandLabel={this.dynamicSetBrandFilterLabelAndState}
                    />
                </div>
                <div className={listClass}>
                    <PureShopListWrap filterParams={filterParamsObj} />
                </div>
            </div>
        );
    }
}
