import React, { PureComponent } from 'react';

// 业务组件
import HouseLists from 'components/App/HouseList/HouseLists';
import Filter from 'components/App/HouseList/Filter/Filter';
import EasyHead from 'Shared/EasyHead';

import {
    stringifyPostionState,
    stringifyMoreState,
    stringifyRentState,
    stringifyHouseTypeState,
} from './stringifyState';
import { parseUrl } from './parseUrl';
import { transUrlFrgObjToStr } from './utils';
import { goApartmentHouseList } from 'application/App/routes/routes';
import { parseUrlQueryFields } from 'lib/util';
import { execWxShare } from 'lib/wxShare';
import { kzPv } from 'lib/pv';
import { 
    InitStateFilterLabel,
    InitStateFilterState, 
    InitStateFilterUrlFrg,
} from 'application/App/HouseList/initState';

import './realStyles.less';

const classPrefix = 'g-realhouselist';

// 临时方案
const storeKey = 'apartmentHouseFilter';

window.setStore(storeKey, {
    urlFrg: InitStateFilterUrlFrg,
    state: InitStateFilterState,
    label: InitStateFilterLabel,
    paramsObj: {},
});

export default class RealHouseList extends PureComponent {
    constructor(props) {
        super(props);

        const {
            queryFieldsObj,
            search,
        } = parseUrlQueryFields();
        this.queryFieldsObj = queryFieldsObj;

        // 从filter store中取出初始化到this相应变量上
        this._getStoreFilterInfo();

        window.setStore('url', {
            filterQueryFieldsObj: queryFieldsObj,
            filterSearch: search,
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

        // setStore filter
        this._setStoreFilterInfo();
        const urlFrgRt = transUrlFrgObjToStr(this.urlFrgObj);

        // setStore url.filterUrlFragment
        // this._setStoreFilterUrlFrg(urlFrgRt);

        goApartmentHouseList(this.props.history)(urlFrgRt);

        // 未知原因，需要设置延时来确保微信分享正常
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.wxShare();
        }, 500);
    }

    _setStoreFilterInfo() {
        window.setStore(storeKey, {
            state: this.filterState,
            label: this.filterLabel,
            paramsObj: this.filterParamsObj,
            urlFrg: this.urlFrgObj,
        });
    }

    _getStoreFilterInfo() {
        const filterStore = window.getStore(storeKey);
        const {
            label,
            state,
            paramsObj,
            urlFrg,
        } = filterStore;
        this.filterLabel = label;
        this.filterState = state;

        // 各个筛选器url片段
        this.urlFrgObj = urlFrg;

        // 筛选的请求参数
        this.filterParamsObj = {
            apartmentId: this.queryFieldsObj.apartment || null,
            ...paramsObj,
        };
        this._setStoreFilterInfo();
    }

    // _setStoreFilterUrlFrg(filterUrlFragment) {
    //     window.setStore('url', {
    //         filterUrlFragment,
    //     });
    // }
    
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

        const filterStore = parseUrl(filterUrlFragment);

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
            this._setStoreFilterInfo();
        }
    }

    componentDidMount() {
        this.wxShare();

        if (this.queryFieldsObj.daili) {
            kzPv(this.queryFieldsObj.daili, 'nangua_daili_list');
        }
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <div className={`${classPrefix}-head`}>
                    <EasyHead
                        renderRight={() => (
                            <span className={`${classPrefix}-title f-singletext-ellipsis`}>品牌公寓</span>
                        )}
                    />
                </div>
                <Filter
                    className={`${classPrefix}-filter`}
                    onFilterConfirm={this.onFilterConfirm}
                    onDynamicPtStateAndLabel={this._dynamicSetPtStateAndLabel}
                    filterState={this.filterState}
                    filterLabel={this.filterLabel}
                    storeKey={storeKey}
                />
                <HouseLists
                    filterParams={this.filterParamsObj}
                />
            </div>
        );
    }
}
