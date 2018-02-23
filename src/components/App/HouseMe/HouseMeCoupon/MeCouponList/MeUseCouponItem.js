import React, { PureComponent } from 'react';

import MeCouponItem from './MeCouponItem';
import QrCodeDialog from '../QrCodeDialog/QrCodeDialog';

import './styles.less';

const classPrefix = 'm-mecouponitem-use';

export default class MeUseCouponItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    onOpenDialogTap = () => {
        this.setState({
            show: true,
        });
    }

    onCloseDialogTap = () => {
        this.setState({
            show: false,
        });
    }

    render() {
        const {
            show,
        } = this.state;

        return (
            <div className={classPrefix}>
                <MeCouponItem type='use' />
                <hr className={`${classPrefix}-line`} />
                <span className={`f-display-block ${classPrefix}-btn-use`} onTouchTap={this.onOpenDialogTap}>立即使用</span>
                <QrCodeDialog show={show} onClose={this.onCloseDialogTap}/>
            </div>
        );
    }
}

