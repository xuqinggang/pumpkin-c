import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ExpandText from 'Shared/ExpandText/ExpandText';
import defaultImg from './images/default.png';

import './styles.less';

const classPrefix = 'm-apartmentintro';

export default class ApartmentIntro extends PureComponent {
    render() {
        const { className, apartmentIntroData, withoutImage } = this.props;
        const { name, image, intro } = apartmentIntroData;

        return (
            <div className={`${classPrefix} ${className}`} onTouchTap={this.props.goApartment}>
                <div className={`${classPrefix}-head`}>
                    {
                        withoutImage ?
                            null
                            : <img
                                src={image || defaultImg}
                                alt=""
                                className={`f-vertical-middle ${classPrefix}-img`}
                                data-event-track-click
                                data-event-track-param-element="DETAIL_ELEMENT_LOGO"
                                data-event-track-param-page="HOUSE_DETAIL"
                                data-event-track-param-event="CLICK"
                            />
                    }
                    <h1
                        className={`f-vertical-middle ${classPrefix}-title s-housedetail-comptitle`}
                        data-event-track-click
                        data-event-track-param-element="DETAIL_APARTMENT_NAME"
                        data-event-track-param-page="HOUSE_DETAIL"
                        data-event-track-param-event="CLICK"
                    >
                        {name}
                    </h1>
                </div>
                <ExpandText intro={intro} type="aparment" />
            </div>
        );
    }
}

ApartmentIntro.propTypes = {
    withoutImage: PropTypes.bool,
    className: PropTypes.string,
    apartmentIntroData: PropTypes.shape({
        name: PropTypes.string,
        intro: PropTypes.string,
        image: PropTypes.string,
    }),
    goApartment: PropTypes.func,
};

ApartmentIntro.defaultProps = {
    withoutImage: false,
    className: '',
    apartmentIntroData: {
        name: '',
        intro: '',
        image: '',
    },
    goApartment: () => null,
};
