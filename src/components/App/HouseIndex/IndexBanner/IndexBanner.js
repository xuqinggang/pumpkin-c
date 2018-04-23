import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-indexbanner';

export default class IndexBanner extends PureComponent {
    render() {
        const {
            url,
            avatar,
        } = this.props;

        return (
            <div className={classnames(classPrefix)}>
                <a className={`f-display-inlineblock ${classPrefix}-img-wrap`} href={url}>
                    <img className={`f-display-inlineblock ${classPrefix}-img`} src={avatar} alt="" />
                </a>
            </div>
        );
    }
}
