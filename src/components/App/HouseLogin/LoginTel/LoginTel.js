import React, { PureComponent } from 'react';
import classnames from 'classnames';

import PopToolTip from 'Shared/PopToolTip/PopToolTip';
import CountDownBtn from 'Shared/CountDownBtn/CountDownBtn';

import { ajaxVerifyCode } from 'application/App/HouseLogin/ajaxLogin';
import { regTel } from 'lib/regExp';

import './styles.less';

const classPrefix = 'm-houselogin';

export default class LoginTel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            telVal: '',
            isTelValid: false,
        };
    }

    handleTelChange = (e) => {
        const telVal = e.target.value;
        this.setState({
            telVal,
            isTelValid: regTel.test(telVal),
        });
    }


    // 点击事件-获取验证码
    handleGetVerifyTap = () => {
        const telVal = this.state.telVal;
        ajaxVerifyCode(telVal)
            .then((bool) => {
                // 验证成功
                if (bool) {
                    const {
                        url,
                    } = this.props.match;
                    //             console.log('handleGetVerifyTap', url)
                    this.props.history.push(`${url}/${telVal}`);
                }
            })
            .catch((err) => {
                // 验证失败
                PopToolTip({text: err.code ? err.msg : err.toString()});
            })
    }
    
    render() {
        const {
            telVal,
            isTelValid,
        } = this.state;

        const verifyBtnClass = classnames('u-btn-getverify', {
            active: isTelValid,
        });

        return (
            <div className={`${classPrefix}-telrouter`}>
                <div className={`${classPrefix}-input-wrap`}>
                    <input
                        className={`${classPrefix}-input`}
                        type="number"
                        value={telVal}
                        onChange={this.handleTelChange}
                        placeholder="请输入手机号"
                    />
                    {
                        isTelValid ? 
                            <span className={`f-display-inlineblock icon-right righticon`}></span>
                            : null
                    }
                </div>
                <div className={`${classPrefix}-verifybtn-wrap`}>
                    <span className={verifyBtnClass} onTouchTap={this.handleGetVerifyTap}>
                        获取验证码
                    </span>
                </div>
            </div>
        )
    }
}

