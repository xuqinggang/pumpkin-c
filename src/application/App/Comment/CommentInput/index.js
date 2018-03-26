import React, { PureComponent } from 'react';

import './styles';

import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';

import { Stars, ImageUploadInput } from 'components/App/Comment'

const classPrefix = 'g-commentinput';

export default class CommentInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            images: [],
        };
    }

    handleSubmit = () => {
        console.log('提交');
    }

    handleStars = (newRating) => {
        console.log(newRating);
    }

    handleChange = (event) => {
        this.setState({comment: event.target.value});
    }

    render() {
        const { history } = this.props;
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
                    <div className={`f-display-flex f-flex-align-center`}>
                        <span className="rating-title">综合评分</span>
                        <Stars   
                            count={5}
                            onChange={this.handleStars}
                            size={48}
                            color2={'#F38D39'} 
                        />
                    </div>
                    <ImageUploadInput />
                </div>
            </div>
        );
    }
}