import React, { PureComponent } from 'react';
import classnames from 'classnames';

import PopToolTip from 'Shared/PopToolTip/PopToolTip';
import CountDownBtn from 'Shared/CountDownBtn/CountDownBtn';

import { ajaxVerifyCode, ajaxSlideCaptcha } from 'application/App/HouseLogin/ajaxLogin';
import { genSlideCaptcha } from 'application/App/HouseLogin/utils';
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

    getVerifyCode({ mobile, ticket }) {
        ajaxVerifyCode({ mobile, ticket })
            .then((bool) => {
                // 验证成功
                if (bool) {
                    const {
                        url,
                    } = this.props.match;

                    const {
                        search,
                    } = this.props.location;
                    this.props.history.push(urlJoin(url, mobile)+`${search}`);
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
        genSlideCaptcha(telVal)
            .then((ticket) => {
                this.getVerifyCode({
                    mobile: phone,
                    ticket: ticket,
                });
            })
            .catch(() => {
                this.setState({
                    isTelValid: true,
                });
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

