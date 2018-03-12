import React, { PureComponent } from 'react';
import PureApartmentList from '../PureApartmentList';
import NoApartment from '../NoApartment';

import { ajaxGetApartmentList } from 'application/App/ApartmentList/ajaxInitApartmentList';
import { shallowEqual } from 'lib/util';

// import './styles.less';

const classPrefix = 'm-pureapartmentlistwrap';

export default class PureApartmentListWrap extends PureComponent {
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

        const apartmentFilter = window.getStore('apartmentFilter');
        const filter = (apartmentFilter && apartmentFilter.filterParamsObj) || {};

        ajaxGetApartmentList({
            filter,
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
                <NoApartment />
            )
        }

        return (
            <PureApartmentList
                list={apartmentList}
                onLoadMore={this.handleLoadMore}
                loading={loading}
                pager={pager}
            />
        );
    }
}
