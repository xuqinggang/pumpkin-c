import React, { PureComponent } from 'react';

// 业务组件
import IndexHead from 'components/App/HouseIndex/IndexHead/IndexHead';
import IndexBanner from 'components/App/HouseIndex/IndexBanner/IndexBanner';
import IndexRecommend from 'components/App/HouseIndex/IndexRecommend/IndexRecommend';
import HouseLists from 'components/App/HouseList/HouseLists';
import Filter from 'components/App/HouseList/Filter/Filter';
import BottomOpenNative from 'Shared/BottomOpenNative/BottomOpenNative';

import { InitStateFilterLabel, InitStateFilterState } from 'application/App/HouseList/initState';
import {
    FILTER_SEPARATOR,
    parseUrl,
    stringifyPostionState,
    stringifyMoreState,
    stringifyRentState,
    stringifyHouseTypeState,
} from './transState';
import { urlJoin, parseUrlParams } from 'lib/util';
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

        // 各个筛选器url片段
        this.urlFrgObj = {
            position: '',
            rent: '',
            houseType: '',
            more: '',
        };

        // 筛选的请求参数
        this.filterParamsObj = {
            apartmentId: this.urlParamsObj.apartment || null,
        };

        this.filterState = InitStateFilterState;
        this.filterLabel = InitStateFilterLabel;

        window.setStore('url', {
            urlParamsObj,
            urlQuery,
        });

        this.urlPrefix = window.getStore('url').urlPrefix;
    }

    // 由于位置筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label
    _dynamicSetPtStateAndLabel = (stateAndLabelObj) => {
        const {
            state,
            label,
        } = stateAndLabelObj;

        this.filterLabel = Object.assign({}, this.filterLabel, { position: label });
        this.filterState = Object.assign({}, this.filterState, { position: state });

        this.forceUpdate();
    }

    // 筛选确认回调
    // typeFilterStateObj, eg: { type: rent, state: [123, 424] }
    onFilterConfirm = (typeFilterStateObj) => {
        const {
            type,
            state,
        } = typeFilterStateObj;

        const TypeMapStringifyState = {
            rent: stringifyRentState,
            houseType: stringifyHouseTypeState,
            more: stringifyMoreState,
            position: stringifyPostionState,
        };

        const typeStringifStateFun = TypeMapStringifyState[type];
        const {
            url,
            paramsObj,
            label,
        } = typeStringifStateFun(state);

        // filterState
        this.filterState = Object.assign({}, this.filterState, { [type]: state });
        // label
        this.filterLabel = Object.assign({}, this.filterLabel, { [type]: label });
        // 生成筛选参数
        this.filterParamsObj = Object.assign({}, this.filterParamsObj, paramsObj);
        // urlFrgObj
        this.urlFrgObj[type] = url;

        // setStore
        this._setStoreFilterInfo();

        // 拼接生成url
        const urlArr = [];

        Object.keys(this.urlFrgObj).forEach((typeTmp) => {
            const urlFrg = this.urlFrgObj[typeTmp];
            urlFrg && urlArr.push(urlFrg);
        });
        const urlFrgRt = urlArr.join(FILTER_SEPARATOR);


        // this._setStoreFilterUrlFrg(urlFrgRt);

        let link = '';
        // 筛选url片段
        link = urlJoin(this.urlPrefix, 'list', urlFrgRt) + `?${this.urlQuery}`;

        this.props.history.push(link);

        // 未知原因，需要设置延时来确保微信分享正常
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.wxShare();
        }, 500);
    }

    _setStoreFilterInfo() {
        window.setStore('filter', {
            state: this.filterState,
            label: this.filterLabel,
            paramsObj: this.filterParamsObj,
            urlFrg: this.urlFrgObj,
        });
    }

    _setStoreFilterUrlFrg(filterUrlFrg) {
        window.setStore('url', {
            filterUrlFrg,
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
        // this._setStoreFilterUrlFrg(filterUrlFragment);

        let filterStore = window.getStore('filter');
        if (!filterStore && filterUrlFragment) {
            filterStore = parseUrl(filterUrlFragment);
        }

        if (filterStore) {
            const {
                urlFrg,
                state,
                label,
                paramsObj,
            } = filterStore;
            this.filterParamsObj = Object.assign({}, this.filterParamsObj, paramsObj);
            this.filterLabel = Object.assign({}, this.filterLabel, label);
            this.filterState = Object.assign({}, this.filterState, state);
            this.urlFrgObj = Object.assign(this.urlFrgObj, urlFrg);
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
            // 每生成一个新的url发送一次pv请求
            window.send_stat_pv && window.send_stat_pv();
        }
    }

    render() {
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
                    onFilterConfirm={this.onFilterConfirm}
                    onDynamicPtStateAndLabel={this._dynamicSetPtStateAndLabel}
                    filterState={this.filterState}
                    filterLabel={this.filterLabel}
                />
                <HouseLists
                    filterParams={this.filterParamsObj}
                />
                {
                    isApp() ?
                        null :
                        <BottomOpenNative
                            schema={`api.nanguazufang.cn/main?rentUnitFilter=${JSON.stringify(this.filterParamsObj)}`}
                        />
                }
            </div>
        );
    }
}
