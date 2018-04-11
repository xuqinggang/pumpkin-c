import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-searchpresent';

export default class SearchPresent extends PureComponent {
    render() {
        const {
            className,
            text,
        } = this.props;

        return (
            <div>
                <span className="icon-search" />
                {
                    text ?
                        <span className={`${className}-text`}>{text}</span>
                        : 
                }
            </div>
        );
    }
}
