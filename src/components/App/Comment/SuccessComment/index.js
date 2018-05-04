import React from 'react';
import './styles.less';
import Button from '../Button';
import { withRouter } from 'react-router';
import { goCommentList, goIndex } from 'application/App/routes/routes';

const classPrefix = 'm-successcomment';

function SuccessComment({
    history,
    apartmentId,
    newCommentId,
}) {
    return (
        <div className={`${classPrefix} g-grid-container f-flex-align-center`}>
            <img className="item" src={require('./images/success.png')} alt="" />
            <p className="item" className="message">恭喜，你的评价提交成功!</p>
            <div className="item">
                <Button className="left-button" onTouchTap={goIndex(history)}>返回首页</Button>
                <Button onTouchTap={() => goCommentList(history)(apartmentId, newCommentId)}>查看评价</Button>
            </div>
        </div>
    );
}

export default withRouter(SuccessComment);
