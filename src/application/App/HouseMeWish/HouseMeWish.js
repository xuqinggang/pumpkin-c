// 心愿单
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import MeWishBack from 'components/App/HouseMeWish/MeWishBack/MeWishBack';
import MeWishList from 'components/App/HouseMeWish/MeWishList/MeWishList';

import './styles.less';

const classPrefix = 'm-housemewish';

export default class HouseMeWish extends PureComponent {
    render() {
        console.log('HouseMeWish');
        return (
            <div>
                <MeWishBack />
                <MeWishList />
            </div>
        )
    }
}
