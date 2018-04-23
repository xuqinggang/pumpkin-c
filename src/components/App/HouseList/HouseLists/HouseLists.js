import React, { PureComponent } from 'react';

import RentUnitList from '../RentUnitList';
import RentUnitsSuggest from '../RentUnitsSuggest';
import SingnalLessNote from '../SingnalLessNote';

import { rentUnitShape, pagerShape } from 'baseData/propTypes';
import fetchRentUnitList from 'application/App/HouseList/fetchRentUnitList';
import { isApp } from 'lib/const';
import { shallowEqual, getScrollTop } from 'lib/util';

import './styles.less';

const clsPrefix = 'm-houselists';

export default class HouseLists extends PureComponent {
    constructor(props) {
        super(props);
    }


    handleLoadMore = () => {
        this.handleFetchList('MORE');
    }

    render() {
        const {
            isFetchCrash,
            rentUnits,
            suggestRentUnits,
            isFetching,
            pager,
            minHeight,
        } = this.props;
        return (
            <div className={clsPrefix}
                ref={ (listDom) => { this.listDom = listDom; } }
                style={{'minHeight': `${minHeight}px`}}>
                <RentUnitList
                    list={rentUnits}
                    pager={pager}
                    loading={isFetching}
                    onLoadMore={this.handleLoadMore}
                />
                {
                    this.fetchType === 'INIT' && isFetchCrash ?
                        <SingnalLessNote />
                        : null
                }
                {
                    // 请求列表数目为0
                    rentUnits.length === 0 && suggestRentUnits.length > 0 ?
                        <RentUnitsSuggest
                            list={suggestRentUnits}
                        />
                        : null
                }
            </div>
        );
    }
}

// HouseLists.propTypes = {
//     rentUnitList: PropTypes.shape({
//         onLoadMore: PropTypes.func,
//         list: PropTypes.arrayOf(rentUnitShape),
//         pager: pagerShape,
//     }),
//     suggestRentUnitList: PropTypes.shape({
//         list: PropTypes.arrayOf(rentUnitShape),
//     }),
//     isLoading: PropTypes.bool,
//     isFetchCrash: PropTypes.bool,
//     fetchFor: PropTypes.oneOf(['RESET', 'LOADMORE']),
// };

// HouseLists.defaultProps = {
//     rentUnitList: {
//         onLoadMore: () => {},
//         list: [],
//     },
//     suggestRentUnitList: {
//         list: [],
//     },
//     isLoading: false,
//     isFetchCrash: false,
//     fetchFor: 'RESET',
// };
