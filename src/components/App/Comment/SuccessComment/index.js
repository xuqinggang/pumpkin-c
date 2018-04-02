import React from 'react';
import './styles.less';
import Button from '../Button';

const classPrefix = 'm-successcomment';

export default function SuccessComment() {
    return (
        <div className={`${classPrefix} g-grid-container f-flex-align-center`}>
            <img className="item" src={require('./images/success.png')} alt="" />
            <p className="item" className="message">恭喜，你的评价提交成功</p>
            <div className="item">
                <Button>返回首页</Button>
                <Button>查看评价</Button>
            </div>
        </div>
    );
}
