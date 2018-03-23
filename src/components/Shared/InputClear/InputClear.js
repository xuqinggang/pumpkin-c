import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { getByteLen } from 'lib/util';

import './styles.less';

const classPrefix = 'm-inputclear';

export default class InputClear extends PureComponent {
    static defaultProps = {
        type: 'text',
        placeholder: '',
        maxLength: 999999,
    };

    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
        };
    }

    onInputChange = (e) => {
        const {
            maxLength,
            onChange,
        } = this.props;

        const inputVal = e.target.value;
        if (getByteLen(inputVal) <= maxLength) {
            this.setState({
                inputVal,
            }, () => {
                if (onChange) {
                    onChange(this.state.inputVal);
                }
            });
        }
    }

    handleClearTap = () => {
        this.setState({
            inputVal: '',
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.inputVal);
            }
        });
    }

    render() {
        const {
            type,
            placeholder,
            className,
        } = this.props;

        return (
            <div className={classnames(`${classPrefix}`, className)}>
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`${classPrefix}-input`}
                    value={this.state.inputVal}
                    onChange={this.onInputChange}
                />
                <span
                    className={`icon-big-close ${classPrefix}-btn-clear`}
                    onTouchTap={this.handleClearTap}
                />
            </div>
        );
    }
}
