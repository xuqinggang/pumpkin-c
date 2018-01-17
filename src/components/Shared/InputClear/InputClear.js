import React, { PureComponent } from 'react';

import './styles.less';

const classPrefix = 'm-inputclear';

export default class InputClear extends PureComponent {
    static defaultProps = {
        type: 'text',
        placeholder: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
        };
    }

    onInputChange = (e) => {
        const inputVal = e.target.value.substr(0, 20);
        this.setState({
            inputVal,
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.inputVal);
            }
        });
    }

    handleClearTap = (e) => {
        this.setState({
            inputVal: '',
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.inputVal);
            }
        })
    }

    render() {
        const {
            type,
            placeholder,
        } = this.props;

        return (
            <div className={`${classPrefix}`}>
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`${classPrefix}-input`}
                    value={this.state.inputVal}
                    onChange={this.onInputChange}
                />
                <span className={`icon-big-close ${classPrefix}-btn-clear`} onTouchTap={this.handleClearTap}></span>
            </div>
        )
    }
}
