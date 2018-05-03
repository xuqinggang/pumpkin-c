import React, { PureComponent } from 'react';
import PureShopList from '../PureShopList';
import NoShop from '../NoShop';

import { ajaxGetShopList } from 'application/App/ShopList/ajaxInitShopList';
import { shallowEqual } from 'lib/util';

const classPrefix = 'm-pureshoplistwrap';

export default class PureShopListWrap extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            apartmentList: [],
            loading: true,
            pager: {
                curPage: 1,
                totalPage: 1,
            },
        };
    }
    fetchData = (renew = false) => {
        const { pager, apartmentList } = this.state;
        let { curPage } = pager;

        // fetching
        this.setState({
            loading: true,
        });

        const filterParamsObj = this.filterParams || {};

        ajaxGetShopList({
            filter: {
                ...filterParamsObj,
            },
            pager,
        }).then((data) => {
            let newApartmentLists = [];
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
        });
    }
    handleLoadMore = () => {
        this.fetchData();
    }
    componentWillMount() {
        this.filterParams = this.props.filterParams;

        this.fetchData(true);
    }
    componentWillReceiveProps(nextProps) {
        this.filterParams = nextProps.filterParams;
        console.log('filterParams', this.filterParams);
        if (this.filterParams && !shallowEqual(this.filterParams, this.props.filterParams)) {
            this.fetchData(true);
        }
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
