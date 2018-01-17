import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { ajaxLogin } from 'application/App/HouseLogin/ajaxLogin';
import CountDownBtn from 'Shared/CountDownBtn/CountDownBtn';
import { ajaxVerifyCode } from 'application/App/HouseLogin/ajaxLogin';

const classPrefix = 'm-houselogin';

export default class LoginVerifyCode extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isVerifyCodeValid: false,
            verifyCodeVal: '',
        };

        // tel值从router中提取
        this.telVal = this.props.match.params.telVal;
    }

    ajaxUserLogin(tel, verifyCode) {
        ajaxLogin(tel, verifyCode)
            .then((infoObj) => {
                // 存储个人信息
                window.setStore('meInfo', infoObj);
            })
    }
    
    handleVerifyCodeChange = (e) => {
        const verifyCodeVal = e.target.value.substr(0, 6);
        this.setState({
            verifyCodeVal,
        });

        // 验证码输入6个数字后，自动登录验证
        if (verifyCodeVal.length === 6) {
            this.ajaxUserLogin(this.telVal, verifyCodeVal)
                .then((data) => {

                })
        }
    }

    // 重新发送验证码
    onReSendVerifyCode = () => {
        ajaxVerifyCode(this.telVal)
            .then((bool) => {
                // 验证成功
                if (bool) {
                }
            })
            .catch((info) => {
                // 验证失败

            })
    }

    render() {
        const {
            verifyCodeVal,
        } = this.state;

        return (
            <div className={`${classPrefix}-verifyrouter`}>
                <span className={`f-display-block ${classPrefix}-showtel`}>{this.telVal}</span>
                <div className={`${classPrefix}-input-wrap`}>
                    <input
                        className={`${classPrefix}-input`}
                        type="number"
                        value={verifyCodeVal}
                        onChange={this.handleVerifyCodeChange}
                        placeholder="请输入验证码"
                    />
                </div>
                <div className={`${classPrefix}-verifybtn-wrap`}>
                    <CountDownBtn start={true} onReStart={this.onReSendVerifyCode}/>
                </div>
            </div>
        )
    }
}
