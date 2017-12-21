import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { rentUnitShape, pagerShape } from 'base/propTypes';
import RentUnitList from '../RentUnitList';
import RentUnitsSuggest from '../RentUnitsSuggest';
import SingnalLessNote from '../SingnalLessNote';
import './styles.less';

const clsPrefix = 'm-houselists';

export default class HouseLists extends Component {
    render() {
        return (
            <div className={clsPrefix}>
                {
                    (this.props.fetchFor === 'RESET' && !this.props.isFetchCrash)
                    || (this.props.fetchFor === 'LOADMORE')
                        ? <RentUnitList
                            {...this.props.rentUnitList}
                            loading={this.props.isLoading}
                            isFetchCrash={this.props.isFetchCrash}
                        />
                        : null
                }
                {
                    this.props.fetchFor === 'RESET' && this.props.isFetchCrash
                    ? <SingnalLessNote />
                    : null
                }
                {
                    (
                        this.props.fetchFor === 'RESET'
                        // 成功请求数据
                        && !this.props.isFetchCrash
                        && !this.props.isLoading
                        // 请求列表数目为0
                        && this.props.rentUnitList.list.length === 0
                    )
                    ? <RentUnitsSuggest {...this.props.suggestRentUnitList} />
                    : null
                }
            </div>
        );
    }
}

HouseLists.propTypes = {
    rentUnitList: PropTypes.shape({
        onLoadMore: PropTypes.func,
        list: PropTypes.arrayOf(rentUnitShape),
        pager: pagerShape,
    }),
    suggestRentUnitList: PropTypes.shape({
        list: PropTypes.arrayOf(rentUnitShape),
    }),
    isLoading: PropTypes.bool,
    isFetchCrash: PropTypes.bool,
    fetchFor: PropTypes.oneOf(['RESET', 'LOADMORE']),
};

HouseLists.defaultProps = {
    rentUnitList: {
        onLoadMore: () => {},
        list: [],
    },
    suggestRentUnitList: {
        list: [],
    },
    isLoading: false,
    isFetchCrash: false,
    fetchFor: 'RESET',
};
