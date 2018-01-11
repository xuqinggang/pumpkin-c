import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import classnames from 'classnames';
import { ajaxLogin, ajaxVerifyCode } from 'application/App/HouseLogin/ajaxLogin';
import CountDownBtn from 'Shared/CountDownBtn/CountDownBtn';

import './styles.less';

const classPrefix = 'm-loginverify';

class LoginVerify extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tel: '',
            isTelValid: false,
            isVerifyCodeValid: false,
            verifyCode: '',
            // 是否切换，如果输入手机号进入验证码则isSwitch为true
            isSwitch: false,
        };
        console.log('LoginVerify', this.props.history, this.props.match, this.props.location)
    }

    handleTelChange = (e) => {
        const regTel = /^1[3|4|5|8][0-9]\d{8}$/;
        const telVal = e.target.value;
        this.setState({
            tel: telVal,
            isTelValid: regTel.test(telVal),
        });
    }

    handleVerifyCodeChange = (e) => {
        let {
            tel,
            verifyCode
        } = this.state;
        const verifyCodeVal = e.target.value.substr(0, 6);
        this.setState({
            verifyCode: verifyCodeVal,
        });

        // 验证码输入6个数字后，自动登录验证
        if (verifyCodeVal.length === 6) {
            this.ajaxUserLogin(tel, verifyCodeVal)
                .then((data) => {

                })
        }
    }

    // 点击事件-获取验证码
    handleGetVerifyTap = () => {
        const tel = this.state.tel;
        ajaxVerifyCode(tel)
            .then((bool) => {
                // 验证成功
                if (bool) {
                    const {
                        url,
                    } = this.props.match;
                    this.props.history.push(`${url}/${tel}`);
                }
            })
            .catch((info) => {
                // 验证失败

            })
    }

    ajaxUserLogin(tel, verifyCode) {
        ajaxLogin(tel, verifyCode)
            .then(() => {

            })
    }

    componentWillReceiveProps(nextProps) {
        const pathTel = nextProps.match.params.tel;
        if (pathTel) {
            this.setState({
                isSwitch: true,
            });
        } else {
            this.setState({
                isSwitch: false,
            })
        }
    }



    render() {
        console.log('LoginVerify render', this.props.match.params.tel);
        const {
            isTelValid,
            tel,
            verifyCode,
            isSwitch,
        } = this.state;

        const verifyBtnClass = classnames('f-display-inlineblock', `${classPrefix}-verifybtn`, {
            active: isTelValid,
        });

        return (
            <div className={`${classPrefix}`}>
                {
                    !isSwitch ?
                    (
                        <div className={`${classPrefix}-telrouter`}>
                            <div className={`${classPrefix}-input-wrap`}>
                                <input
                                    className={`${classPrefix}-input`}
                                    type="number"
                                    value={tel}
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
                    : (
                        // 进入输入验证码状态
                        <div className={`${classPrefix}-verifyrouter`}>
                            <span className={`f-display-block ${classPrefix}-showtel`}>{tel}</span>
                            <div className={`${classPrefix}-input-wrap`}>
                                <input
                                    className={`${classPrefix}-input`}
                                    type="number"
                                    value={verifyCode}
                                    onChange={this.handleVerifyCodeChange}
                                    placeholder="请输入验证码"
                                />
                            </div>
                            <div className={`${classPrefix}-verifybtn-wrap`}>
                                <CountDownBtn start={true} />
                            </div>
                        </div>
                    )

                }
            </div>
        );
    }
}

export default withRouter(LoginVerify);
