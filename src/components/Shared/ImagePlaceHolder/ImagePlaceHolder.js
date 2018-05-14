/* @flow */

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-imageplaceholder';

type StateType = {
    isLoading: boolean,
};

type PropType = {
    className?: string,
    src: string,
    placeholder: string,
};

export default class ImagePlaceHolder extends PureComponent<PropType, StateType> {
    state = {
        isLoading: true,
    };

    handleLoadImg = () => {
        this.setState({
            isLoading: false,
        });
    }

    render() {
        const {
            src,
            placeholder,
            className,
        } = this.props;
        const {
            isLoading,
        } = this.state;

        const imgWrapStyle = {
            backgroundImage: `url('${placeholder}')`,
        };

        const imgClass = classnames(`${classPrefix}-image`, {
            loading: isLoading,
        });

        return (
            <div
                className={classnames(classPrefix, className)}
                style={isLoading ? imgWrapStyle : {}}
            >
                <img
                    alt=""
                    className={imgClass}
                    src={src}
                    onLoad={this.handleLoadImg}
                />
            </div>
        );
    }
}
