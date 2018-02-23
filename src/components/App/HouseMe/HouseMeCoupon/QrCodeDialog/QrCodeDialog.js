import React, { PureComponent } from 'react';
import classnames from 'classnames';

import BottomDialog from 'Shared/BottomDialog';

import './styles.less';

const classPrefix = 'm-qrcodedialog';

export default class QrCodeDialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    handleConcatTap = (e) => {
        this.setState({
            show: true,
        });
    }

    handleNoContactTap = (e) => {
        this.onCloseDialogTap();
    }

    onCloseDialogTap = () => {
        this.setState({
            show: false,
        });
    }

    render() {
        const {
            show,
            onClose,
        } = this.props;

        return (
            <BottomDialog
                show={show}
                onClose={onClose}
                className={`${classPrefix}`}
            >
                <BottomDialog.Body className={`${classPrefix}-body`}>
                    <h2>请向公寓出示以下优惠码</h2>
                    <canvas ref={(dom) => { this.canvasDom = dom; } } />
                    <span>64776392</span>
                </BottomDialog.Body>
                <BottomDialog.Footer className={`${classPrefix}-footer`}>
                    <span onTouchTap={onClose}>
                        知道了
                    </span>
                </BottomDialog.Footer>
            </BottomDialog>
        );
    }
}
