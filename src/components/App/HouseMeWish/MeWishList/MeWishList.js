import React, { PureComponent } from 'react';
import classnames from 'classnames';
import WishRentUnitItem from 'components/App/HouseMeWish/MeWishList/WishRentUnitItem';
import { ajaxInitHouseMeWish } from 'application/App/HouseMe/ajaxHouseMe';

import './styles.less';

const classPrefix = 'm-mewishlist';

export default class MeWishList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };

    }

    componentWillMount() {
        const wishListStore = window.getStore('wishList');
        if (wishListStore) {
            this.setState({
                list: wishListStore,
            });

            return;
        }
        
        ajaxInitHouseMeWish()
            .then((list) => {
                this.setState({
                    list,
                });
            })
    }

    render() {
        const {
            list,
        } = this.state;

        const {
            match,
        } = this.props;

        return (
            <div className={`${classPrefix}`}>
                {
                    list.map((item, index) =>{
                        return <WishRentUnitItem info={item} key={index} match={match} /> 
                    })
                }
            </div>
        );
    }
}
