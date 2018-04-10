import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const classPrefix = 'm-pubimgupload';
const SIZE_LIMIT = 8;
const imgCutModifier = '?crop=1&cpos=middle&w=200&h=200';

class PubImgUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            loading: false,
        };

        this.$imgInput = null;
    }

    handleAddImage = () => {
        const { limit } = this.props;
        const { images } = this.state;

        let added = false;
        if (images.length < limit) {
            added = true;
            this.$imgInput.click();
        }

        this.props.onAdd(images, added);
    }

    handleDelete = (index) => {
        const { images } = this.state;

        const newImages = [...images];
        newImages.splice(index, 1);

        this.setState({
            images: newImages,
        });

        this.props.onDelete(newImages, index);
    }

    uploadHandler = (e) => {
        const { files } = e.target;

        // 异步触发 image change
        // setTimeout(() => this.props.onImageChange(e));

        if (files.length < 0) return;

        const { limit, fetch: uploadImageFetch } = this.props;
        const { images } = this.state;
        const currentImageCount = images.length;

        // 只上传 limit 以内的图片
        let fileArray = Array.from(files);
        fileArray = fileArray.slice(0, limit - currentImageCount);

        this.setState({
            loading: true,
        });

        // 上传图片
        const uploadTasks = fileArray.map(file => uploadImageFetch(file));
        Promise.all(uploadTasks).then((data) => {
            const newImages = [...images, ...data];
            this.setState({
                images: newImages,
            });
            this.props.onImageUploaded(true, newImages);
        }).catch((error) => {
            this.props.onImageUploaded(false, error);
        }).finally(() => {
            this.setState({
                loading: false,
            });
        });
    }

    componentWillMount() {
        const { images } = this.props;
        this.setState({
            images,
        });
    }

    render() {
        const { limit } = this.props;
        const { images, loading } = this.state;

        return (
            <div className={`${classPrefix}`}>
                {
                    images.map((image, index) => (
                        <div key={index} className="item">
                            <div className="img-wrap">
                                <img src={`${image}${imgCutModifier}`} alt={index} />
                                <div className="delete" role="presentation" onClick={() => this.handleDelete(index)} />
                            </div>
                        </div>
                    ))
                }
                {
                    images.length < limit &&
                    <div className="item" role="presentation" onClick={this.handleAddImage}>
                        <img className="add-image" src={require('./images/add-image.png')} alt="" />
                    </div>
                }
                {
                    true &&
                    <div className="loading-wrap">
                        <img className="loading" src={require('./images/loading.png')} alt="" />
                    </div>
                }
                <input
                    type="file"
                    name="file"
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                    style={{ display: 'none' }}
                    multiple="multiple"
                    ref={(input) => { this.$imgInput = input; }}
                    onChange={this.uploadHandler}
                />
            </div>
        );
    }
}

PubImgUpload.propTypes = {
    images: PropTypes.arrayOf(PropTypes.any),
    fetch: PropTypes.func,
    onDelete: PropTypes.func,
    onAdd: PropTypes.func,
    onImageChange: PropTypes.func,
    onImageUploaded: PropTypes.func,
    limit: PropTypes.number,
};

PubImgUpload.defaultProps = {
    images: [],
    fetch: () => null,
    onDelete: () => null,
    onAdd: () => null,
    onImageChange: () => null,
    onImageUploaded: () => null,
    limit: SIZE_LIMIT,
};

export default PubImgUpload;
