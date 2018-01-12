import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { ajaxVerifyCode } from 'application/App/HouseLogin/ajaxLogin';
import CountDownBtn from 'Shared/CountDownBtn/CountDownBtn';

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
        const regTel = /^1[3|4|5|8][0-9]\d{8}$/;
        const telVal = e.target.value;
        this.setState({
            telVal,
            isTelValid: regTel.test(telVal),
        });
    }


    // 点击事件-获取验证码
    handleGetVerifyTap = () => {
        const telVal = this.state.telVal;
        // ajaxVerifyCode(telVal)
        //     .then((bool) => {
        //         // 验证成功
        //         if (bool) {
                    const {
                        url,
                    } = this.props.match;
        //             console.log('handleGetVerifyTap', url)
                    this.props.history.push(`${url}/${telVal}`);
                // }
            // })
            // .catch((info) => {
                // // 验证失败

            // })
    }
    
    render() {
        const {
            telVal,
            isTelValid,
        } = this.state;

        const verifyBtnClass = classnames('f-display-inlineblock', `${classPrefix}-verifybtn`, {
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

