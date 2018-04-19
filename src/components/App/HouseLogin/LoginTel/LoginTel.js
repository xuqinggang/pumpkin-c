import React, { PureComponent } from 'react';
import classnames from 'classnames';

import PopToolTip from 'Shared/PopToolTip/PopToolTip';
import CountDownBtn from 'Shared/CountDownBtn/CountDownBtn';

import { ajaxVerifyCode, ajaxSlideCaptcha } from 'application/App/HouseLogin/ajaxLogin';
import { goLoginTel } from 'application/App/routes/routes';
import { regTel } from 'lib/regExp';
import { urlJoin, dynamicScript } from 'lib/util';

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
        const isTelValid = regTel.test(telVal);

        this.setState({
            telVal,
            isTelValid,
        });

        if (isTelValid) {
            e.target.blur();
        }
    }

    genSlideCaptcha(phone) {
        const divDom = document.createElement('div');
        document.body.appendChild(divDom);

        ajaxSlideCaptcha(phone)
            .then(data => {
                const {
                    url,
                } = data;
                // 如果url为空的话，则不需要滑动验证
                if (!url) {
                    this.getVerifyCode({
                        mobile: phone,
                        ticket: '',
                    });
                    return;
                }

                url && dynamicScript(url, () => {
                    window.capInit(divDom, {
                        type: 'popup',
                        pos: 'fixed',
                        themeColor: 'f38d39',
                        callback: (retJson) => {
                            if (retJson && retJson.ret === 0) {
                                const ticket = retJson.ticket;
                                this.getVerifyCode({
                                    mobile: phone,
                                    ticket: ticket,
                                });
                                window.capDestroy();
                            } else {
                                this.setState({
                                    isTelValid: true,
                                });
                                window.capDestroy();
                            }
                        },
                    });
                });
            })
    }

    getVerifyCode({ mobile, ticket }) {
        ajaxVerifyCode({ mobile, ticket })
            .then((bool) => {
                // 验证成功
                if (bool) {
                    goLoginTel(this.props.history)(telVal);
                }
            })
            .catch((err) => {
                this.setState({
                    isTelValid: true,
                });
                // 验证失败
                PopToolTip({text: err.code ? err.msg : err.toString()});
            })
    }

    // 点击事件-获取验证码
    handleGetVerifyTap = () => {
        const telVal = this.state.telVal;
        // 验证码先disable
        this.setState({
            isTelValid: false,
        });
        this.genSlideCaptcha(telVal);
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

