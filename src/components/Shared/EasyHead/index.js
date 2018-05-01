import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Alert from 'Shared/Alert';

import './styles.less';

const classPrefix = 'm-easyhead';

class EasyHead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPrompt: false,
        };
    }

    back = () => {
        if (!this.props.prompt) {
            window.history.back();
            return;
        }

        Alert({
            title: '提示',
            message: '退出将丢失评价内容',
            buttons: [
                {
                    text: '取消',
                },
                {
                    text: '确定',
                    onClick: () => {
                        window.history.back();
                    },
                },
            ],
        });
    }

    handlePromptClose = () => {
        window.history.back();
    }

    render() {
        const { renderRight } = this.props;
        return (
            <div className={`${classPrefix} f-display-flex f-flex-align-center`}>
                <a
                    // href="javascript:history.back();"
                    onTouchTap={this.back}
                    className={`f-display-flex f-flex-align-center icon-back ${classPrefix}-btn-back-browser`}/>
                <div className="head-right-wrap">
                    {
                        renderRight()
                    }
                </div>
            </div>
        );
    }
}

EasyHead.propTypes = {
    renderRight: PropTypes.func,
    prompt: PropTypes.string,
};

EasyHead.defaultProps = {
    renderRight: () => null,
    prompt: '',
};

export default EasyHead;
