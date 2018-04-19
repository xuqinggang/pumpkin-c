import React, { PureComponent } from 'react';
import classnames from 'classnames';

import {
    ShopFilter,
    PureShopListWrap,
} from 'components/App/ShopList';
import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';

import { stateToParams, getTextFromBrands } from './stateToParams';
import { execWxShare } from 'lib/wxShare';
import { dynamicDocTitle, urlJoin, parseUrlQueryFields } from 'lib/util';
import { isRmHead, isNanguaApp } from 'lib/const';
import { postRouteChangeToIOS } from 'lib/patchNavChangeInIOS';
import { AbbrevMapCity } from 'config/config';
import {
    goShopList,
} from 'application/App/routes/routes';

import { brandFilterBus } from './Filters';

import './styles.less';

const classPrefix = 'g-shoplist';

const isSimulateNative = () => isRmHead() && isNanguaApp();

export default class ShopList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            // 位置筛选
            positionFilter: {
                state: {},
                label: {},
                param: {},
            },
            // 品牌筛选
            brandFilter: {
                state: brandFilterBus.state,
                label: brandFilterBus.label,
                param: brandFilterBus.param,
            },
        };

        // 目前的情况比较单纯，可以认为在这页就会跳出 webview 页
        if (isSimulateNative()) {
            postRouteChangeToIOS({
                canGoBack: false,
                url: window.location.href,
            });
        }
    }

    get filterLabel() {
        const { brandFilter } = this.state;
        return {
            position: '位置',
            brand: brandFilter.label,
        }
    }
    get filterState() {
        const { brandFilter } = this.state;
        return {
            position: {},
            brand: brandFilter.state,
        };
    }
    get filterParamsObj() {
        const { brandFilter } = this.state;
        return {
            position: {},
            apartmentIds: brandFilter.param,
        };
    }

    _setStoreFilterUrlFragment = (filterUrlFragment) => {
        window.setStore('url', {
            filterUrlFragment,
        });
    }

    componentWillMount() {
        // store filterUrlFragment for easy get
        const filterUrlFragment = this.props.match.params.filterUrlFragment;
        this.filterUrlFragment = filterUrlFragment;
        brandFilterBus.parseUrlToState(filterUrlFragment, (brandFilter) => {
            console.log('brandFilter', brandFilter);
            this.setState({
                brandFilter,
            });
        });

        const filterStore = window.getStore('apartmentFilter');
        if (filterStore) {
            this.setState(filterStore);
        } else {
            this._genStateAndParamsByFilterUrlFragment(filterUrlFragment);
        }
    }

    componentDidMount() {
        this.wxShare();
        dynamicDocTitle('南瓜租房');
    }

    componentWillReceiveProps(nextProps) {
        const curFilterUrlFragment = this.props.match.params.filterUrlFragment;
        const nextFilterUrlFragment = nextProps.match.params.filterUrlFragment;
        if (curFilterUrlFragment !== nextFilterUrlFragment) {
            this._genStateAndParamsByFilterUrlFragment(nextFilterUrlFragment);
        }
    }

    // 由于位置筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label
    dynamicSetPositionFilterLabel = (label) => {
        console.log(label, 'label', 'dynamicSetPositionFilterLabel');
    }
    // 由于品牌筛选，数据是异步请求的，所以需要等异步请求完后，再动态的改变label 和 state
    dynamicSetBrandFilterLabelAndState = (state, label) => {
        console.log(state, label, 'dynamicSetBrandFilterLabelAndState');
    }

    goShopList = (filterUrlFragment) => {
        goShopList(this.props.history)(filterUrlFragment);
    }

    onFilterConfirm = (newState) => {
        const { filterUrlFragment } = this;
        if (newState && newState.brand) {
            brandFilterBus
                .parseStateToOthers(newState.brand, filterUrlFragment, (brandFilter, filterUrlFragment) => {
                    this.setState({
                        brandFilter,
                    });
                    this.goShopList(filterUrlFragment);
                });
        }
    }

    // 根据 url 片段生成state和params
    _genStateAndParamsByFilterUrlFragment(filterUrlFragment) {}

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
        } = this;

        const listClass = classnames(
            `${classPrefix}-padding-top`,
            {
                [`${classPrefix}-no-head`]: isRmHead(),
            },
        );

        return (
            <div className={`${classPrefix}`}>
                <div className={`${classPrefix}-fixed-top`}>
                    {
                        !isRmHead()
                            ? <HouseHead
                                history={history}
                                renderRight={() => (
                                    <span className={`${classPrefix}-title f-singletext-ellipsis`}>{'集中式公寓'}</span>
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