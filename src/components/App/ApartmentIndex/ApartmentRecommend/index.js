import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SimpleScroll from 'Shared/SimpleScroll/SimpleScroll';

import './styles.less';

const classPrefix = 'm-apartmentrecommend';

export default class ApartmentRecommend extends PureComponent {
    render() {
        const {
            recommends,
        } = this.props;

        return (
            <div className={classnames(classPrefix)}>
                <div>
                    <SimpleScroll key={recommends.length} className={`${classPrefix}-wrapper`}>
                        <ul className={`${classPrefix}-list`}>
                            {
                                recommends.map((item, index) => {
                                    return (
                                        <li className="f-display-inlineblock list-item" key={index}>
                                            <a href={item.url} className="f-display-inlineblock">
                                                <img className="f-display-inlineblock item-img" src={item.avatar} alt="" />
                                            </a>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </SimpleScroll>
                </div>
            </div>
        );
    }
}

ApartmentRecommend.propTypes = {
    recommends: PropTypes.arrayOf(PropTypes.shape({
        avatar: PropTypes.string,
        url: PropTypes.string,
    })),
};

ApartmentRecommend.defaultProps = {
    recommends: [],
};
