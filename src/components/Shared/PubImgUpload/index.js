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

    uploadHandler = (e) => {
        const files = e.target.files;

        if (files.length < 0) return;

        const { limit, fetch: uploadImageFetch } = this.props;
        const { images } = this.state;
        let currentImageCount = images.length;

        this.setState({
            loading: true,
        });

        Array.from(files).forEach((file, index) => {            
            if (currentImageCount.length >= limit) throw new Error('传图到达上限');

            uploadImageFetch(file).then(data => {
                console.log('data', data);
            }).catch(error => {
                console.log(error);
            });

        })

    }

    render() {
        const { limit } = this.props;
        const { images } = this.state;

        return (
            <div className={classPrefix}>
                {
                    images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={index} />
                            <div role="presentation" onClick={this.props.onDelete}>x</div>
                        </div>
                    ))
                }
                {
                    images.length <= limit &&
                    <div role="presentation" onClick={this.handleAddImage}>
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
