import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const classPrefix = 'm-titlewithmore';

export default class TitleWidthMore extends PureComponent {

    onTouchTap = () => {
        window.location.href = 'nangua://nanguazufang.cn?rentUnitId=155770074798514176';
    }

    render() {
        const {
            title,
            goMore,
        } = this.props;

        return (
            <div className={`${classPrefix} f-display-flex f-flex-justify-between f-flex-align-center`}>
                <a onTouchTap={this.onTouchTap}>
                    <span className="title">{title}</span>
                </a>
                <span className="more f-display-flex f-flex-align-center" onTouchTap={goMore}>更多<i className="icon-next next" /></span>
            </div>
        );
    }
}

TitleWidthMore.propTypes = {
    title: PropTypes.string,
    goMore: PropTypes.func,
};

TitleWidthMore.defaultProps = {
    title: '',
    goMore: () => null,
};
