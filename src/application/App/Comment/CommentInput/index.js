import React, { PureComponent } from 'react';

import { Stars, ImageUploadInput, SuccessComment } from 'components/App/Comment';
import { ajaxPostComment } from '../ajaxInitComment';
import PopToolTip from 'Shared/PopToolTip/PopToolTip';
import EasyHead from 'Shared/EasyHead';
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
            newCommentId: null,
        };
    }

    get hasEdited() {
        const { content, images } = this.state;
        return content || images.length > 0;
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
            commentQueueStorage.shift();
            this.setState({
                newCommentId: data.id,
            });
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
        const { newCommentId } = this.state;
        return (
            <SuccessComment apartmentId={apartmentId} newCommentId={newCommentId} />
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
        );
    }

    fixIOSSoftKeyboard = (e) => {
        if (e.target.tagName !== 'TEXTAREA') {
            const textArea = document.getElementsByTagName('textarea');
            textArea && textArea[0] && textArea[0].blur();
        }
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
        const { commentDone, title } = this.state;

        return (
            <div onTouchTap={this.fixIOSSoftKeyboard} className={`${classPrefix}`}>
                <EasyHead
                    prompt={this.hasEdited && !commentDone ? '退出将丢失评价内容' : ''}
                    renderRight={() => (
                        <div className={`${classPrefix}-head-right f-display-flex f-flex-justify-between`}>
                            <span className={`${classPrefix}-title f-singletext-ellipsis`}>{title}</span>
                            {
                                !commentDone &&
                                <div className={`${classPrefix}-submit f-singletext-ellipsis`} onTouchTap={this.handleSubmit}>提交</div>
                            }
                        </div>
                    )}
                />
                { this.renderMain() }
            </div>
        );
    }
}