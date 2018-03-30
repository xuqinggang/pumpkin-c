import React, { PureComponent } from 'react';

import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';
import { Stars, ImageUploadInput } from 'components/App/Comment';
import { ajaxPostComment } from '../ajaxInitComment';
import PopToolTip from 'Shared/PopToolTip/PopToolTip';

import './styles.less';

const classPrefix = 'g-commentinput';

export default class CommentInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            images: [],
            score: 5,
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
            PopToolTip({ text: '提交成功' });
        }).catch((error) => {
            PopToolTip({ text: '提交失败' });
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

    render() {
        const { history } = this.props;
        const { score } = this.state;

        return (
            <div className={`${classPrefix}`}>
                <HouseHead
                    history={history}
                    renderRight={() => (
                        <div className={`${classPrefix}-head-right f-display-flex f-flex-justify-between`}>
                            <span className={`${classPrefix}-title f-singletext-ellipsis`}>{'xxx评论'}</span>
                            <div className={`${classPrefix}-submit f-singletext-ellipsis`} onTouchTap={this.handleSubmit}>提交</div>
                        </div>
                    )}
                />
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
            </div>
        );
    }
}