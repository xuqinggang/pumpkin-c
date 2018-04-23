import React, { PureComponent } from 'react';
import classnames from 'classnames';

import SimpleScroll from 'Shared/SimpleScroll/SimpleScroll';

import './styles.less';

const classPrefix = 'm-indexrecommend';

export default class IndexRecommend extends PureComponent {
    render() {
        const {
            recommends,
        } = this.props;

        return (
            <div className={classnames(classPrefix)}>
                <h2 className={`${classPrefix}-title`}>为你推荐</h2>
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
