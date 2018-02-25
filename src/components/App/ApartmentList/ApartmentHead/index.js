import React, { PureComponent } from 'react';

import './styles.less';

const classPrefix = 'm-apartmenthead';

export default class ApartmentHead extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    } 

    render() {
        return (
            <div className={`g-grid-row f-flex-justify-between ${classPrefix}`}>
                <div className={'f-display-flex f-flex-align-center'}>
                    <a
                        href="javascript:history.back();"
                        className={`icon-back ${classPrefix}-btn-back-browser`}
                    >
                    </a>
                    <span className={`${classPrefix}-title`}>集中式公寓</span>
                </div>
                <div className={`f-display-flex f-flex-align-center`}>
                    <span className={`icon-share ${classPrefix}-icon ${classPrefix}-btn-share`}></span> 
                </div>
            </div>
        );
    }
}
