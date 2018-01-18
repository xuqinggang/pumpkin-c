import React, { PureComponent } from 'react';

import EditNickNameBack from './EditNickNameBack';
import InputClear from 'Shared/InputClear/InputClear';
import PopToolTip from 'Shared/PopToolTip/PopToolTip';

import { ajaxEditNickName } from 'application/App/HouseMe/ajaxHouseMe';

import './styles.less';

const classPrefix = 'm-editnickname';

export default class EditNickName extends PureComponent {
    constructor(props) {
        super(props);
        this.nickname = props.nickname || '';
    }

    onNickNameChange = (nickname) => {
        this.nickname = nickname;
    }

    onSaveNickName = () => {
        ajaxEditNickName(this.nickname)
            .then((bool) => {
                if (bool) {
                    window.setStore('meInfo', {
                        nickname: this.nickname,
                    });
                    PopToolTip({text: '昵称保存成功'});
                    this.props.history.goBack();
                }
            })
            .catch((err) => {
                PopToolTip({text: err.code ? err.msg : err.toString()})
            })
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <EditNickNameBack onSaveNickName={this.onSaveNickName} />
                <InputClear onChange={this.onNickNameChange} placeholder="请输入昵称" maxLength={20} />
                <span className={`f-display-inlineblock ${classPrefix}-tip`}>
                    请输入昵称，不超过20个字符，一个汉字为2个字符
                </span>
            </div>
        )
    }
}
