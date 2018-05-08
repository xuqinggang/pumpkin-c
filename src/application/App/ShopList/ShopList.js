import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { ShopFilter, PureShopListWrap } from 'components/App/ShopList';
import EasyHead from 'Shared/EasyHead';

import { execWxShare } from 'lib/wxShare';
import { dynamicDocTitle } from 'lib/util';
import { isLikeNativeView } from 'lib/const';
import { postRouteChangeToIOS } from 'lib/patchNavChangeInIOS';
import { AbbrevMapCity } from 'config/config';
import { goShopList, goExclusiveShop } from 'application/App/routes/routes';
import { brandFilterBus } from './filters/brandFilter';
import { districtFilterBus } from './filters/districtFilter';
import { stringifyPostionState } from 'application/App/HouseList/stringifyState';
import { parseUrl as parsePositionUrl } from 'application/App/HouseList/parseUrl';
import { apartmentFilterStoreKey, urlModuleSplit } from './filters/utils';

import './styles.less';

const classPrefix = 'g-shoplist';

export default class ShopList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            // 位置筛选
            positionFilter: {
                state: {},
                label: '位置',
                param: {},
            },
            // 品牌筛选
            brandFilter: {
                state: brandFilterBus.state,
                label: brandFilterBus.label,
                param: brandFilterBus.param,
            },
            // 行政区域筛选
            districtFilter: {
                state: districtFilterBus.state,
                label: districtFilterBus.label,
                param: districtFilterBus.param,
            },

            queryCount: 0,
        };

        // 目前的情况比较单纯，可以认为在这页就会跳出 webview 页
        if (isLikeNativeView()) {
            postRouteChangeToIOS({
                canGoBack: false,
                url: window.location.href,
            });
        }

        const url = props.match.url;
        if (url.indexOf('exclusive') > -1) {
            this.isExclusive = true;
        }
    }

    get filterLabel() {
        const { positionFilter, brandFilter, districtFilter } = this.state;
        return {
            position: positionFilter.label,
            brand: brandFilter.label,
            district: districtFilter.label,
        };
    }
    get filterState() {
        const { brandFilter, positionFilter, districtFilter } = this.state;
        return {
            position: positionFilter.state,
            brand: brandFilter.state,
            district: districtFilter.state,
        };
    }
    get filterParamsObj() {
        const { brandFilter, positionFilter, districtFilter } = this.state;
        return {
            position: positionFilter.param,
            apartmentIds: brandFilter.param,
            districtId: districtFilter.param,
        };
    }

    wxShare = () => {
        const urlStore = window.getStore('url');
        const { cityName } = urlStore;
        const cityText = AbbrevMapCity[cityName].text;

        execWxShare({
            title: `${cityText} - 品质生活独栋公寓`,
            link: window.location.href.split('#')[0],
            imgUrl: 'https://pic.kuaizhan.com/g3/42/d4/5a65-2d67-4947-97fd-9844135d1fb764/imageView/v1/thumbnail/200x200',
            desc: '生活不止眼前的苟且，还有诗和远方，快来这里看看高品质的集中式公寓吧。',
        });
    }

    // 由于位置筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label
    dynamicSetPositionFilterLabel = (positionStateAndLabel) => {
        const { label, state } = positionStateAndLabel;
        this.setState({
            positionFilter: {
                ...this.state.positionFilter,
                label,
                state,
            },
        });
    }
    // 由于品牌筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label 和 state
    dynamicSetBrandFilterLabelAndState = () => {
        const brandFilter = brandFilterBus.parseUrlToState(this.filterUrlFragment) || {};
        this.setState({
            brandFilter: { ...this.state.brandFilter, ...brandFilter },
        });
    }

    dynamicSetDistrictLabel = (districts) => {
        const label = districtFilterBus.setLabel(districts) || {};
        this.setState({
            districtFilter: {
                ...this.state.districtFilter,
                label,
            },
        });
    }

    goShopList = (filterUrlFragment) => {
        if (this.isExclusive) {
            goExclusiveShop(this.props.history)(filterUrlFragment);
        } else {
            goShopList(this.props.history)(filterUrlFragment);
        }
    }

    handleBrandSelect(brand) {
        const { filterUrlFragment } = this;
        const {
            // filterState: brandFilter,
            url: nextFilterUrlFragment,
        } = brandFilterBus.parseStateToOthers(brand, filterUrlFragment);
        this.goShopList(nextFilterUrlFragment);
    }

    handlePositionSelect(position) {
        const {
            url,
            paramsObj,
            label,
        } = stringifyPostionState(position);
        this.setState({
            positionFilter: {
                param: paramsObj,
                label,
                state: position,
            },
        }, () => {
            // 为 position 做的兼容
            const brandUrl = brandFilterBus.stringifyParam();
            const composedUrl = brandUrl ? url + urlModuleSplit + brandUrl : url;
            this.goShopList(composedUrl);
        });
    }

    handledDistrictSelect = (districtId) => {
        const { filterUrlFragment } = this;
        const {
            // filterState: districtFilter,
            url: nextFilterUrlFragment,
        } = districtFilterBus.parseStateToOthers(districtId, filterUrlFragment);
        this.goShopList(nextFilterUrlFragment);
    }

    onFilterConfirm = (newState) => {
        if (!newState) return;
        const { brand, position, district } = newState;
        if (brand) {
            this.handleBrandSelect(brand);
        } else if (position) {
            this.handlePositionSelect(position);
        } else if (district !== undefined) {
            this.handledDistrictSelect(district);
        }

        this.setState({
            queryCount: this.state.queryCount + 1,
        });
    }

    // 为 position 做的兼容
    setStoreFilterInfo() {
        const oldApartmentFilter = window.getStore(apartmentFilterStoreKey);
        window.setStore(apartmentFilterStoreKey, {
            ...oldApartmentFilter,
            state: this.filterState,
            label: this.filterLabel,
            paramsObj: this.filterParamsObj,
            urlFrg: this.urlFrgObj,
        });
    }

    getFilterFromUrl(filterUrlFragment) {
        this.filterUrlFragment = filterUrlFragment;

        const { paramsObj: positionParam, urlFrg } = parsePositionUrl(filterUrlFragment) || {};
        this.urlFrgObj = urlFrg;

        const brandFilter = brandFilterBus.parseUrlToState(filterUrlFragment) || {};
        const districtFilter = districtFilterBus.parseUrlToState(filterUrlFragment) || {};

        this.setState({
            brandFilter: {
                ...this.state.brandFilter,
                ...brandFilter,
            },
            positionFilter: {
                ...this.state.positionFilter,
                param: positionParam,
            },
            districtFilter: {
                ...this.state.districtFilter,
                ...districtFilter,
            },
        });

        this.setStoreFilterInfo();
    }

    componentWillMount() {
        const { filterUrlFragment } = this.props.match.params;
        this.getFilterFromUrl(filterUrlFragment);
    }

    componentDidMount() {
        this.wxShare();
        dynamicDocTitle('集中式公寓');
    }

    componentWillReceiveProps(nextProps) {
        const { filterUrlFragment } = nextProps.match.params;
        this.getFilterFromUrl(filterUrlFragment);
    }

    render() {
        const { history } = this.props;

        const {
            filterState,
            filterLabel,
            filterParamsObj,
        } = this;

        const listClass = classnames(
            `${classPrefix}-padding-top`,
            {
                [`${classPrefix}-no-head`]: isLikeNativeView(),
            },
        );

        return (
            <div className={`${classPrefix}`}>
                <div className={`${classPrefix}-fixed-top`}>
                    {
                        !isLikeNativeView()
                            ? <EasyHead
                                backCount={this.state.queryCount + 1}
                                renderRight={() => (
                                    <span className={`${classPrefix}-title f-singletext-ellipsis`}>集中式公寓</span>
                                )}
                            />
                            : null
                    }
                    <ShopFilter
                        className="shopfilter"
                        filterState={filterState}
                        filterLabel={filterLabel}
                        onFilterConfirm={this.onFilterConfirm}
                        onFilterClear={this.onFilterClear}
                        onFilterReSume={this.onFilterReSume}
                        onDynamicSetPositionLabel={this.dynamicSetPositionFilterLabel}
                        onDynamicSetBrandLabel={this.dynamicSetBrandFilterLabelAndState}
                        onDynamicSetDistrictLabel={this.dynamicSetDistrictLabel}
                        isExclusive={this.isExclusive}
                    />
                </div>
                <div className={listClass}>
                    <PureShopListWrap filterParams={filterParamsObj} />
                </div>
            </div>
        );
    }
}
