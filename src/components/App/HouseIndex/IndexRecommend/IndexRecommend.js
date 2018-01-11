import React, { PureComponent } from 'react';
import classnames from 'classnames';

import SimpleScroll from 'Shared/SimpleScroll/SimpleScroll';

import './styles.less';

const classPrefix = 'm-indexrecommend';

export default class IndexRecommend extends PureComponent {
    render() {
        const {
            data,
        } = this.props;
        console.log('IndexRecommend', data);
        return (
            <div className={classnames(classPrefix)}>
                <h2 className={`${classPrefix}-title`}>为你推荐</h2>
                <div>
                    <SimpleScroll key={data.length} className={`${classPrefix}-wrapper`}>
                        <ul className={`${classPrefix}-list`}>
                            {
                                data && data.map((item, index) => {
                                    return (
                                        <li className="f-display-inlineblock list-item" key={index}>
                                            <a href={item.url}>
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
