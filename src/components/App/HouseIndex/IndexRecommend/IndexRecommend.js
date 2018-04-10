import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { ajaxInitHouseIndexRecommend } from 'application/App/HouseIndex/ajaxInitHouseIndex';
import SimpleScroll from 'Shared/SimpleScroll/SimpleScroll';

import './styles.less';

const classPrefix = 'm-indexrecommend';

export default class IndexRecommend extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            indexRecommendArr: [],
        };
    }

    componentWillMount() {
        const houseIndexData = window.getStore('houseIndex');

        // 如果存在数据，则不请求
        if (houseIndexData && houseIndexData.indexRecommendArr) {
            this.setState({
                indexRecommendArr: houseIndexData.indexRecommendArr,
            });
            return;
        }
        
        ajaxInitHouseIndexRecommend()
            .then((indexRecommendArr) => {
                this.setState({
                    indexRecommendArr,
                });
                window.setStore('houseIndex', {
                    indexRecommendArr,
                });
            })
    }
    
    render() {
        const {
            indexRecommendArr,
        } = this.state;

        return (
            <div className={classnames(classPrefix)}>
                <h2 className={`${classPrefix}-title`}>为你推荐</h2>
                <div>
                    <SimpleScroll key={indexRecommendArr.length} className={`${classPrefix}-wrapper`}>
                        <ul className={`${classPrefix}-list`}>
                            {
                                indexRecommendArr.map((item, index) => {
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
