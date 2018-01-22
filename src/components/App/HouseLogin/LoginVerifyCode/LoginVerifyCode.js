import React, { PureComponent } from 'react';
import classnames from 'classnames';

import PopToolTip from 'Shared/PopToolTip/PopToolTip';
import CountDownBtn from 'Shared/CountDownBtn/CountDownBtn';

import { ajaxLogin } from 'application/App/HouseLogin/ajaxLogin';
import { ajaxVerifyCode } from 'application/App/HouseLogin/ajaxLogin';

const classPrefix = 'm-houselogin';

export default class LoginVerifyCode extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            verifyCodeVal: '',
        };

        // tel值从router中提取
        this.telVal = props.match.params.telVal;

        this.rootUrlPrefix = window.getStore('urlInfo').rootUrlPrefix;
    }

    ajaxUserLogin(tel, verifyCode) {
        ajaxLogin(tel, verifyCode)
            .then((infoObj) => {
                // 存储个人信息
                window.setStore('meInfo', infoObj);

                this.props.history.replace(`${this.rootUrlPrefix}/me`);
            })
            .catch((err) => {
                PopToolTip({text: err.code ? err.msg : err.toString()});
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
            e.target.blur();
        }
    }

    // 重新发送验证码
    onReSendVerifyCode = () => {
        this.setState({
            verifyCodeVal: '',
        });

        ajaxVerifyCode(this.telVal)
            .catch((err) => {
                // 验证失败
                PopToolTip({text: err.code ? err.msg : err.toString()});
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
