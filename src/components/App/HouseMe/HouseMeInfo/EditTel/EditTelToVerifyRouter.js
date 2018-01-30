import React, { PureComponent } from 'react';
import classnames from 'classnames';

import CountDownBtn from 'Shared/CountDownBtn/CountDownBtn';
import PopToolTip from 'Shared/PopToolTip/PopToolTip';

import { ajaxUpdateTel, ajaxUpdatemobileCaptchas } from 'application/App/HouseMe/ajaxHouseMe';

import './styles.less';

const classPrefix = 'm-edittel';

export default class EditTelToVerifyRouter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isVerifyCodeValid: false,
            verifyCodeVal: '',
        };

        // tel值从router中提取
        this.telVal = this.props.match.params.telVal;
    }

    handleVerifyCodeChange = (e) => {
        const verifyCodeVal = e.target.value.substr(0, 6);
        this.setState({
            verifyCodeVal,
        });

        // 验证码输入6个数字后，自动更改手机号
        if (verifyCodeVal.length === 6) {
            e.target.blur();
            
            // 更改手机号
            ajaxUpdateTel(this.telVal, verifyCodeVal)
                .then((bool) => {
                    if (bool) {
                        window.setStore('meInfo', {
                            phone: this.telVal,
                        });
                        this.props.history.go(-2);
                    }
                })
                .catch((err) => {
                    // 验证失败
                    PopToolTip({text: err.code ? err.msg : err.toString()})
                })
        }
    }

    // 重新发送验证码
    onReSendVerifyCode = () => {
        ajaxUpdatemobileCaptchas(this.telVal)
            .catch((err) => {
                // 验证失败
                PopToolTip({text: err.code ? err.msg : err.toString()})
            })
    }

    render() {
        return (
            <div>
                <span className={`f-display-block ${classPrefix}-showtel`}>{this.telVal}</span>
                <input
                    type="number"
                    className={`${classPrefix}-input`}
                    placeholder='请输入验证码'
                    onChange={this.handleVerifyCodeChange}
                />
                <span className={`f-display-block ${classPrefix}-tip`}>
                    更换手机号后，将不能使用原手机号登录
                </span>
                <div className={`${classPrefix}-verifybtn-wrap`}>
                    <CountDownBtn start={true} onReStart={this.onReSendVerifyCode} />
                </div>
            </div>
        );
    }
}
