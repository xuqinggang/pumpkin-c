import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-meinfo'

export default class MeInfo extends PureComponent{
    render() {
        const {
            className,
        } = this.props;
        return (
            <div className={classnames(`${classPrefix}`, className)}>
                <h4 className={`${classPrefix}-label`}>您好，</h4>
                <h3 className={`${classPrefix}-name`}>南瓜租客</h3>
            </div>
        );
    }
}
