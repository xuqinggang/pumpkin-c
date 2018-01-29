import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-reporttextarea';

export default class ReportTextArea extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        };
    }

    onMsgChange = (e) => {
        const textareaVal = e.target.value.substr(0, 300);
        this.setState({
            msg: textareaVal,
        });
        this.props.onChange(textareaVal);
    }

    render() {
        const {
            className,
        } = this.props;

        const {
            msg,
        } = this.state;

        const reportTextAreaClass = classnames(`${classPrefix}`, className);

        return (
            <div className={reportTextAreaClass}>
                <textarea className={`${classPrefix}-textarea`} cols="30" rows="10" value={msg}
                    placeholder="请简单描述您遇到的问题，便于我们核查"
                    onChange={this.onMsgChange}
                />
            </div>
        );
    }
}
