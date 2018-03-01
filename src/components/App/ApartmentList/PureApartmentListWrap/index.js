import React, { PureComponent } from 'react';
import PureApartmentList from '../PureApartmentList';
import NoApartment from '../NoApartment';

// import './styles.less';

const classPrefix = 'm-pureapartmentlistwrap';

// TODO mock api
const fetchApi = () => {
    return new Promise((resolve, reject) => {
        resolve({
            list: [{},{},{},{},{},{}],
            total: 80,
        })
    });
}

export default class PureApartmentListWrap extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            apartmentList: [],
            loading: false,
            pager: {
                curPage: 1,
                totalPage: 1,
            }
        };
    }
    componentDidMount() {
        this.fetchData(true);
    }
    fetchData = (renew=false) => {
        const { pager, apartmentList } = this.state;
        let curPage = pager.curPage;
        // fetching
        this.setState({
            loading: true,
        });
        fetchApi().then(data => {
            if (!renew) {
                curPage += 1;
            }
            this.setState({
                loading: false,
                pager: {
                    curPage,
                    totalPage: data.total,
                },
                apartmentList: apartmentList.concat(data.list),
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
        if (apartmentList.length === 0) {
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
