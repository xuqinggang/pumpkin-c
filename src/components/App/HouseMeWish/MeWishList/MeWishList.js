
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import ajaxInitHouseMeWish from 'application/App/HouseMeWish/ajaxInitHouseMeWish';
import WishRentUnitItem from 'components/App/HouseMeWish/MeWishList/WishRentUnitItem';

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
        ajaxInitHouseMeWish()
            .then((list) => {
                console.log('MeWishList', list);
                this.setState({
                    list,
                });
            })
    }

    render() {
        const {
            list,
        } = this.state;
        return (
            <div className={`${classPrefix}`}>
                {
                    list.map((item, index) =>{
                        return <WishRentUnitItem info={item} key={index} /> 
                    })
                }
            </div>
        );
    }
}
