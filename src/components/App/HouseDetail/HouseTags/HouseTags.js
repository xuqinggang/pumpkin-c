import React, { PureComponent } from 'react';

import './styles.less';

const classPrefix = 'm-housetags'

export default class HouseTags extends PureComponent {
    render() {
        const { houseTagsArrData, className } = this.props;
        const tagsList =  houseTagsArrData.map((tag, index) => {
            return (
                <li key={index} className={`${classPrefix}-item`}>
                    <span className={`f-display-inlineblock item-text`}>{tag}</span>
                </li>
            );
        });

        if (tagsList && tagsList.length) {
            return (
                <div className={`${classPrefix} ${className}`}>
                    <ul>
                        { 
                            tagsList
                        }
                    </ul>
                </div>
            )
        }

        return null;
    }
}
