import React, { PureComponent } from 'react';

import PubImgUpload from 'components/Shared/PubImgUpload';
import { ajaxPostImage } from 'application/App/Comment/ajaxInitComment';

import './styles';

const classPrefix = 'm-imageuploadinput';

export default class ImageUploadInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            images: [],
        };
    }

    handleChange = (event) => {
        this.setState({comment: event.target.value});
    }

    render() {
        const { history } = this.props;
        return (
            <div className={`${classPrefix}`}>
                <div className="textarea">
                    <textarea
                        placeholder="房源信息是否真实、管家服务态度 、居住体验等…"
                        value={this.state.comment} onChange={this.handleChange} />
                    <PubImgUpload fetch={ajaxPostImage} />
                </div>
            </div>
        );
    }
}