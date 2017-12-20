import React, { Component } from 'react';
import MoneyFilter from 'Shared/MoneyFilter/MoneyFilter';
import FilterConfirmConnect from 'Shared/FilterConfirmConnect/FilterConfirmConnect';
import classnames from 'classnames';

// 位置筛选，请求初始化筛选数据
// class MoneyFilterWrap extends Component {
//     constructor(props) {
//         super(props);
//     }


//     render() {
//         return (
//             <MoneyFilter/>
//         )
//     }
// }

export default FilterConfirmConnect()(MoneyFilter);
