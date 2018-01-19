import React, { PureComponent } from 'react';

import LogoImg from 'images/App/singleLogo.png';
import MeFeedBackBack from 'components/App/HouseMeFeedBack/MeFeedBackBack/MeFeedBackBack';
import PopToolTip from 'Shared/PopToolTip/PopToolTip';

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
                    PopToolTip({text: '反馈成功'});
                    this.props.history.goBack();
                }
            })
            .catch((err) => {
                // 发送失败
                PopToolTip({text: err.code ? err.msg : err.toString()})
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
                        className={`u-btn-submit ${classPrefix}-btn-submit`}
                        onTouchTap={this.handleSumitTap}
                    >
                        提交
                    </span>
                </div>
            </div>
        );
    }
}
