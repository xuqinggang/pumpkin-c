import React, { PureComponent } from 'react';

import PubImgUpload from 'components/Shared/PubImgUpload';
import { ajaxPostImage } from 'application/App/Comment/ajaxInitComment';

import './styles.less';

const classPrefix = 'm-imageuploadinput';

export default class ImageUploadInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        };
    }

    handleChange = (event) => {
        let comment = event.target.value;
        comment = comment.slice(0, 500);
        this.setState({ comment });
        this.props.onContentChange(comment);
    }

    handleImageUpload = (flag, images) => {
        if (flag) {
            this.props.onImageChange(images);
        }
    }

    render() {
        const { comment } = this.state;
        return (
            <div className={`${classPrefix}`}>
                <div className="textarea-wrap">
                    <div className="textarea">
                        <textarea
                            placeholder="房源信息是否真实、管家服务态度 、居住体验等…"
                            value={this.state.comment}
                            onChange={this.handleChange}
                        />
                        <span className={`${classPrefix}-remaining`}>{comment.length}/500</span>
                    </div>
                    <PubImgUpload
                        fetch={ajaxPostImage}
                        onImageUploaded={this.handleImageUpload}
                        limit={9}
                    />
                </div>
            </div>
        );
    }
}