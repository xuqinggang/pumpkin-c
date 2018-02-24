import React, { PureComponent } from 'react';
import ApartmentItem from '../ApartmentItem';

import './styles.less';

export default class PureApartmentList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {}

    render() {
        return (
            <div>
                {
                    new Array(89).fill(1).map((x, i) => (
                        <div>
                            <ApartmentItem />
                            <p>{i + 1}</p>
                        </div>
                    ))
                }
            </div>
        );
    }
}
