import React from 'react';
import './styles.less';
import Button from '../Button';
import { withRouter } from 'react-router';
import { withHistory } from 'application/App/routes';
import { createCommentListPath } from 'application/App/Comment';

const classPrefix = 'm-successcomment';

const createApartmentPath = apartmentId => `apartment/${apartmentId}`;

function SuccessComment({
    history,
}) {
    const goCommentList = withHistory(history)(createCommentListPath);
    const goApartment = withHistory(history)(createApartmentPath);
    return (
        <div className={`${classPrefix} g-grid-container f-flex-align-center`}>
            <img className="item" src={require('./images/success.png')} alt="" />
            <p className="item" className="message">恭喜，你的评价提交成功!</p>
            <div className="item">
                <Button className="left-button" onTouchTap={() => goApartment('1')}>返回首页</Button>
                <Button onTouchTap={() => goCommentList('1')}>查看评价</Button>
            </div>
        </div>
    );
}

export default withRouter(SuccessComment);
