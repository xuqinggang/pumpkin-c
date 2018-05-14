/* @flow */

import React, { PureComponent } from 'react';

import RentUnitList from '../RentUnitList';
import RentUnitsSuggest from '../RentUnitsSuggest';
import SingnalLessNote from '../SingnalLessNote';

import { rentUnitShape, pagerShape } from 'baseData/propTypes';
import fetchRentUnitList from 'application/App/HouseList/fetchRentUnitList';
import { isApp } from 'lib/const';
import { shallowEqual, getScrollTop } from 'lib/util';

import './styles.less';

const classPrefix = 'm-houselists';

type PropType = {
    onLoadMore: Function,
    isPending: boolean,
    isError: boolean,
    isInit: boolean,
    rentUnits: [rentUnitItemType],
    suggestRentUnits: [rentUnitItemType],
};

export default class HouseLists extends PureComponent<PropType> {
    render() {
        const {
            rentUnits,
            suggestRentUnits,
            isPending,
            isError,
            isInit,
            onLoadMore,
        } = this.props;

        return (
            <div
                className={classPrefix}
            >
                {
                    isInit && isError ?
                        <SingnalLessNote />
                        : null
                }
                {
                    rentUnits.length > 0 ?
                        <RentUnitList
                            list={rentUnits}
                            isLoading={isPending}
                            onScrollBottom={onLoadMore}
                        />
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
