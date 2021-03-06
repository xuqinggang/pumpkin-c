/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import InputClear from 'Shared/InputClear/InputClear';

import './styles.less';

const classPrefix = 'm-inputsearch';

type PropType = {
    className?: string,
    onInputChange: Function,
};

export default class InputSearch extends PureComponent<PropType> {
    static defaultProps = {
        onChange: () => {},
    }

    render() {
        const {
            className,
            onInputChange,
        } = this.props;

        return (
            <div className={classnames(classPrefix, className)}>
                <span className={`icon-search ${classPrefix}-btn-search`} />
                <InputClear
                    className={`${classPrefix}-input-wrapper`}
                    onChange={onInputChange}
                />
            </div>
        );
    }
}

