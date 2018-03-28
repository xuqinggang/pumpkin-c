import React, {
    Component,
} from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const classPrefix = 'm-pubimgupload';
const SIZE_LIMIT = 8;

class PubImgUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            loading: false,
        };

        this.$imgInput = null;
    }

    componentDidMount() {
        const { images } = this.props;
        this.setState({
            images,
        });
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

        let newImages = [...images];
        newImages.splice(index, 1);
        
        this.setState({
            images: newImages
        });
        
        this.props.ondelete(newImages, index);
    }

    uploadHandler = (e) => {
        const files = e.target.files;
        if (files.length < 0) return;

        const { limit, fetch: uploadImageFetch } = this.props;
        const { images } = this.state;
        let currentImageCount = images.length;

        // 只上传 limit 以内的图片
        let fileArray = Array.from(files);
        fileArray = fileArray.slice(0, limit - currentImageCount);

        this.setState({
            loading: true,
        });
        
        const uploadTasks = fileArray.map(file => uploadImageFetch(file));
        Promise.all(uploadTasks).then(data => {
            this.setState({
                images: [...images, ...data]
            })
        }).catch(error => {
            console.log(error, 'upload error');
            // TODO
        }).finally(() => {
            this.setState({
                loading: false,
            });
        });
    }

    render() {
        const { limit } = this.props;
        const { images } = this.state;

        return (
            <div className={`${classPrefix}`}>
                {
                    images.map((image, index) => (
                        <div key={index} className="item">
                            <div className="img-wrap">
                                <img src={image} alt={index} />
                                <div className="delete" role="presentation" onClick={() => this.handleDelete(index)}>x</div>
                            </div>
                        </div>
                    ))
                }
                {
                    images.length < limit &&
                    <div className="item add-image" role="presentation" onClick={this.handleAddImage}>
                        add Image
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
    // url: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.any),
    fetch: PropTypes.func,
    onDelete: PropTypes.func,
    onAdd: PropTypes.func,
    onImageChange: PropTypes.func,
    onImageUploaded: PropTypes.func,
    limit: PropTypes.number,
    // colCount: propTypes.number,
};

PubImgUpload.defaultProps = {
    // url: '',
    images: [],
    fetch: () => null,
    onDelete: () => null,
    onAdd: () => null,
    onImageChange: () => null,
    onImageUploaded: () => null,
    limit: SIZE_LIMIT,
    // colCount: 4,
};

export default PubImgUpload;
