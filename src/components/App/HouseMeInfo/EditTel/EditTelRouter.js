import React, { PureComponent } from 'react';
import classnames from 'classnames';

import InputClear from 'Shared/InputClear/InputClear';
import PopToolTip from 'Shared/PopToolTip/PopToolTip';

import { ajaxUpdatemobileCaptchas } from 'application/App/HouseMe/ajaxHouseMe';
import { regTel } from 'lib/regExp';

import './styles.less';

const classPrefix = 'm-edittel';

export default class EditTelRouter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            telVal: props.telVal || '',
            isTelValid: props.telVal ? regTel.test(props.telVal) : false,
        };
    }

    onTelValChange = (telVal) => {
        this.setState({
            telVal,
            isTelValid: regTel.test(telVal),
        });
    }

    handleGetVerifyTap = () => {
        const telVal = this.state.telVal;
        ajaxUpdatemobileCaptchas(telVal)
            .then((bool) => {
                // 验证成功
                if (bool) {
                    const {
                        url,
                    } = this.props.match;
                    this.props.history.push(`${url}/${telVal}`);
                }
            })
            .catch((err) => {
                console.log('err', err);
                // 验证失败
                PopToolTip({text: err.code ? err.msg : err.toString()})
            })
    }

    render() {
        const verifyBtnClass = classnames('u-btn-getverify', {
            active: this.state.isTelValid,
        });
        
        return (
            <div>
                <InputClear onChange={this.onTelValChange} type="number" placeholder="请输入新的手机号"/>
                <span className={`f-display-inlineblock ${classPrefix}-tip`}>
                    更换手机号后，将不能使用原手机号登录
                </span>
                <div className={`${classPrefix}-verifybtn-wrap`}>
                    <span className={verifyBtnClass} onTouchTap={this.handleGetVerifyTap}>获取验证码</span>
                </div>
            </div>
        );
    }
}
