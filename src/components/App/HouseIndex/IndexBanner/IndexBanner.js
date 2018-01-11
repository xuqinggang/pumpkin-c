
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-indexbanner';

export default class IndexBanner extends PureComponent {
    render() {
        const {
            data,
        } = this.props;
        const {
            avatar,
            url,
        } = data;

        return (
            <div className={classnames(classPrefix)}>
                <a href={url}>
                    <img className={`f-display-inlineblock ${classPrefix}-img`} src={avatar} alt="" />
                </a>
            </div>
        );
    }
}
