/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-searchpresent';

type PropType = {
    className: string,
    onNavigateTap: () => void,
    onClearSearch: () => void,
    searchRt: string,
};

export default class SearchPresent extends PureComponent<PropType> {
    handleClearSearch = (e) => {
        e.stopPropagation();
        this.props.onClearSearch();
    }
    render() {
        const {
            className,
            searchRt,
            onNavigateTap,
        } = this.props;

        return (
            <div
                className={classnames('f-display-flex f-flex-align-center', classPrefix, className)}
                onTouchTap={onNavigateTap}
            >
                <span className={`${classPrefix}-btn-search icon-search`} />
                {
                    searchRt ?
                        <div
                            className={`f-display-inlineblock ${classPrefix}-rt`}
                            onTouchTap={this.handleClearSearch}
                        >
                            <span className="rt-text">
                                {searchRt}
                            </span>
                            <span className="rt-close icon-small-close" />
                        </div>
                        : <span className={`${classPrefix}-text-default`}>想住哪呢</span>
                }
            </div>
        );
    }
}
