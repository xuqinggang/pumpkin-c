import React, { PureComponent } from 'react';
import PureShopList from '../PureShopList';
import NoShop from '../NoShop';

import { ajaxGetShopList } from 'application/App/ShopList/ajaxInitShopList';
import { shallowEqual } from 'lib/util';

const classPrefix = 'm-pureapartmentlistwrap';

export default class PureShopListWrap extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            apartmentList: [],
            loading: true,
            pager: {
                curPage: 1,
                totalPage: 1,
            }
        };
    }
    componentDidMount() {
        // 南瓜租房 iOS APP 传来 cityId 等参数
        const cityId = (window.iOS && window.iOS.getCityId()) || 1;
        this.cityId = cityId;

        this.fetchData(true);
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.filterParams = nextProps.filterParams;
        if (this.filterParams && !shallowEqual(this.filterParams, this.props.filterParams)) {
            this.fetchData(true);
        }
    }
    fetchData = (renew=false) => {
        const { pager, apartmentList } = this.state;
        let curPage = pager.curPage;

        // fetching
        this.setState({
            loading: true,
        });

        const cityId = this.cityId;
        const apartmentFilter = window.getStore('apartmentFilter');
        const filter = (apartmentFilter && apartmentFilter.filterParamsObj) || {};

        ajaxGetShopList({
            filter: {
                ...filter,
                cityId,
            },
            pager,
        }).then(data => {
            let newApartmentLists= [];
            if (!renew) {
                curPage += 1;
                newApartmentLists = apartmentList.concat(data.list);
            } else {
                newApartmentLists = data.list;
            }
            this.setState({
                loading: false,
                pager: {
                    curPage,
                    totalPage: data.pager.totalPage,
                },
                apartmentList: newApartmentLists,
            }, () => {
                if (renew) {
                    window.scrollTo(0, 0);
                }
            });
        })
    }
    handleLoadMore = () => {
        this.fetchData();
    }
    render() {
        const {
            apartmentList,
            loading,
            pager,
        } = this.state;

        // 没有公寓
        if (apartmentList.length === 0 && !loading) {
            return (
                <NoShop />
            )
        }

        return (
            <PureShopList
                list={apartmentList}
                onLoadMore={this.handleLoadMore}
                loading={loading}
                pager={pager}
            />
        );
    }
}
