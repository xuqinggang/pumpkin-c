import React, { PureComponent } from 'react';
import classnames from 'classnames';
import QRCode from 'qrcode';

import BottomDialog from 'Shared/BottomDialog';

import './styles.less';

const classPrefix = 'm-qrcodedialog';

export default class QrCodeDialog extends PureComponent {
    componentDidMount() {
        QRCode.toCanvas(this.canvasDom, this.props.code+'', { width: 6.4 * window.lib.flexible.rem }, function (error) {
            // if (error) console.error(error)
            // console.log('success!');
        });
    }

    render() {
        const {
            show,
            onClose,
            code,
        } = this.props;

        return (
            <BottomDialog
                show={show}
                onClose={onClose}
                className={`${classPrefix}`}
            >
                <BottomDialog.Body className={`${classPrefix}-body`}>
                    <h2 className="body-title">请向公寓出示以下优惠码</h2>
                    <canvas className="body-qrcode" ref={(dom) => { this.canvasDom = dom; } } />
                    <span className="body-couponnumber">{code}</span>
                </BottomDialog.Body>
                <BottomDialog.Footer className={`${classPrefix}-footer`}>
                    <hr className="footer-line" />
                    <span onTouchTap={onClose} className="footer-text">
                        知道了
                    </span>
                </BottomDialog.Footer>
            </BottomDialog>
        );
    }
}
