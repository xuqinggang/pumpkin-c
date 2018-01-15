import React, { PureComponent } from 'react';

import LogoImg from 'images/App/singleLogo.png';
import MeFeedBackBack from 'components/App/HouseMeFeedBack/MeFeedBackBack/MeFeedBackBack';
import { ajaxFeedBack } from 'application/App/HouseMe/ajaxHouseMe';

import './styles.less';

const classPrefix = 'm-feedback';

export default class AboutUs extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            textareaVal: '',
        };
    }

    handleTextAreaChange = (e) => {
        const textareaVal = e.target.value.substr(0, 300);
        this.setState({
            textareaVal,
        });
    }

    handleSumitTap = (e) => {
        ajaxFeedBack(this.state.textareaVal)
            .then((bool) => {
                // 发送成功
                if (bool) {

                }
            })
            .catch((err) => {
                // 发送失败

            })
    }

    render() {
        const {
            textareaVal,
        } = this.state;

        return (
            <div className={`${classPrefix}`}>
                <MeFeedBackBack />
                <div className="f-align-center">
                    <div className={`f-display-inlineblock f-position-relative`}>
                        <textarea
                            onChange={this.handleTextAreaChange}
                            className={`${classPrefix}-textarea`}
                            placeholder="不错呦"
                            value={textareaVal}
                        />
                        <span className={`${classPrefix}-remaining`}>{textareaVal.length}/300</span>
                    </div>
                </div>
                <div className="f-align-center">
                    <span
                        className={`f-display-inlineblock ${classPrefix}-btn-submit`}
                        onTouchTap={this.handleSumitTap}
                    >
                        提交
                    </span>
                </div>
            </div>
        );
    }
}
