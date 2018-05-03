import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BottomDialog from 'Shared/BottomDialog';

import './styles.less';

const classPrefix = 'm-alert-dialog';

export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }
    show = () => {
        this.setState({
            visible: true,
        });
    }
    hide = () => {
        this.setState({
            visible: false,
        });
    }
    wrapHideForButtonAction = (callback) => {
        callback && callback();
        this.hide();
    }
    render() {
        const { title, message, buttons } = this.props;
        const { visible } = this.state;
        return (
            <BottomDialog
                show={visible}
                onClose={this.hide}
                className={`${classPrefix}`}
            >
                <BottomDialog.Header className={`${classPrefix}-header`}>
                    <h2 className="header-title">{title}</h2>
                </BottomDialog.Header>

                <BottomDialog.Body className={`${classPrefix}-body`}>
                    <h2 className="body-title">{message}</h2>
                </BottomDialog.Body>

                <BottomDialog.Footer className={`${classPrefix}-footer`}>
                    <div className="f-display-inlineblock line" />
                    {
                        buttons.map((button, index) => (
                            <a
                                key={index}
                                className="f-display-inlineblock text"
                                onTouchTap={() => this.wrapHideForButtonAction(button.onClick)}
                            >
                                {button.text}
                            </a>
                        ))
                    }
                </BottomDialog.Footer>
            </BottomDialog>
        );
    }
}
Alert.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    })),

    // TODO
    // renderHeader
    // renderBody
    // renderFooter
};

Alert.defaultProps = {
    title: '',
    buttons: [],
};
