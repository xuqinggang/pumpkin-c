import React, { PureComponent } from 'react';

import EditNickNameBack from './EditNickNameBack';
import InputClear from 'Shared/InputClear/InputClear';
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

            })
    }
    render() {
        return (
            <div className={`${classPrefix}`}>
                <EditNickNameBack onSaveNickName={this.onSaveNickName} />
                <InputClear onChange={this.onNickNameChange} />
                <span className={`f-display-inlineblock ${classPrefix}-tip`}>
                    请输入昵称，不超过20个字符，一个汉字为2个字符
                </span>
            </div>
        )
    }
}
