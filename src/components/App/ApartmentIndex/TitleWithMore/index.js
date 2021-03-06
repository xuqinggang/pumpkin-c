import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const classPrefix = 'm-titlewithmore';

export default class TitleWithMore extends PureComponent {

    handleTap = (e) => {
        this.props.goMore();
        e.preventDefault();
    }

    render() {
        const {
            title,
            goMore,
        } = this.props;

        return (
            <div className={`${classPrefix} f-display-flex f-flex-justify-between f-flex-align-center`}>
                <span className="title">{title}</span>
                <span className="more f-display-flex f-flex-align-center" onTouchTap={this.handleTap}>更多<i className="icon-next next" /></span>
            </div>
        );
    }
}

TitleWithMore.propTypes = {
    title: PropTypes.string,
    goMore: PropTypes.func,
};

TitleWithMore.defaultProps = {
    title: '',
    goMore: () => null,
};
