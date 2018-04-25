import React, { PureComponent } from 'react';

import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';
import { Stars, ImageUploadInput, SuccessComment } from 'components/App/Comment';
import { ajaxPostComment } from '../ajaxInitComment';
import PopToolTip from 'Shared/PopToolTip/PopToolTip';
import { commentQueueStorage } from 'application/App/storage';
import { ajaxGetMeInfo } from 'application/App/HouseMe/ajaxHouseMe';

import './styles.less';

const classPrefix = 'g-commentinput';

export default class CommentInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            images: [],
            score: 5,
            commentDone: false,
            title: '',
        };
    }

    handleSubmit = () => {
        const { match, apartmentId } = this.props;
        const { params: { rentUnitId } } = match;
        const { content, images, score } = this.state;

        ajaxPostComment(apartmentId, {
            content,
            images,
            score,
            rentUnitId,
        }).then((data) => {
            this.setState({
                commentDone: true,
                title: '评价完成',
            });
            // TODO 评价成功在第一个显示, 简单处理, 后面用 redux
            const userInfo = window.getStore('meInfo');
            const shiftComment = commentQueueStorage.shift();
            window.setStore('selfComment', {
                content,
                images,
                score,
                rentUnitId,
                updateTime: Date.now() / 1000,
                userInfo,
                title: shiftComment.title,
            });
            // 待评价队列出队
        }).catch(() => {
            PopToolTip({ text: '评论提交失败' });
        });
    }

    handleStars = (score) => {
        this.setState({
            score,
        });
    }

    handleImageChange = (images) => {
        this.setState({
            images,
        });
    }

    handleContentChange = (content) => {
        this.setState({
            content,
        });
    }

    renderSuccess = () => {
        const { apartmentId } = this.props;
        return (
            <SuccessComment apartmentId={apartmentId} />
        );
    }

    renderMain = () => {
        const { score, commentDone } = this.state;

        if (commentDone) {
            return this.renderSuccess();
        }

        return (
            <div className="main">
                <div className="stars-wrap f-display-flex f-flex-align-center">
                    <span className="rating-title">综合评分</span>
                    <Stars
                        className="stars"
                        count={5}
                        value={score}
                        half={false}
                        onChange={this.handleStars}
                        color2="#F38D39"
                    />
                </div>
                <ImageUploadInput
                    onImageChange={this.handleImageChange}
                    onContentChange={this.handleContentChange}
                />
            </div>
        )
    }

    componentWillMount() {
        const comments = commentQueueStorage.get();
        const comment = (comments && comments[0]) || { ttile: '评价' };
        this.setState({
            title: comment.title,
        });

        // get user info TODO we need may need it in all page
        ajaxGetMeInfo()
            .then((meInfoObj) => {
                window.setStore('meInfo', meInfoObj);
            });
    }

    render() {
        const { history } = this.props;
        const { commentDone, title } = this.state;

        return (
            <div className={`${classPrefix}`}>
                <div className="head f-display-flex f-flex-align-center">
                    <a
                        href="javascript:history.back();"
                        className={`f-display-flex f-flex-align-center icon-back ${classPrefix}-btn-back-browser`}/>
                    <div className="head-right-wrap">
                        <div className={`${classPrefix}-head-right f-display-flex f-flex-justify-between`}>
                            <span className={`${classPrefix}-title f-singletext-ellipsis`}>{title}</span>
                            {
                                !commentDone &&
                                <div className={`${classPrefix}-submit f-singletext-ellipsis`} onTouchTap={this.handleSubmit}>提交</div>
                            }
                        </div>
                    </div>
                </div>
                { this.renderMain() }
            </div>
        );
    }
}