// 心愿单
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import MeWishBack from 'components/App/HouseMeWish/MeWishBack/MeWishBack';
import MeWishList from 'components/App/HouseMeWish/MeWishList/MeWishList';

const classPrefix = 'm-housemewish';

export default class HouseMeWish extends PureComponent {
    render() {
        const {
            match,
        } = this.props;

        return (
            <div>
                <MeWishBack />
                <MeWishList match={match} />
            </div>
        );
    }
}
