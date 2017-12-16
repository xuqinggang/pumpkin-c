import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-houseintro';

class HouseIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand : false,
            // intro: '房源详情介绍，由租房者填写。在前端限制为 150 字显示，一个标点符号算一 个字，超过 150 字的部分折叠显示。点击查看更多展开内容，再然后进行弹窗展示。房源详情介绍，由租房者填写。房源详情介绍，由租房者填写。在前端限制为 150 字显示，一个标点符号算一 个字，超过 150 字的部分折叠显示。点击查看更多展开内容，再然后进行弹窗展示。房源详情介绍，由租房者填写。',
        };
        this.handleExpandTap = this.handleExpandTap.bind(this);
    }

    handleExpandTap() {
        this.setState({
            isExpand: !this.state.isExpand,
        })
    }

    render() {
        const { className } = this.props;
        const { isExpand } = this.state;
        let houseIntroStr = this.props.houseIntroStr;

        const textClass = classnames(`intro-text`, {
            'text-expand': isExpand,
        });

        const isExpandBtnShow = houseIntroStr && houseIntroStr.length > 150;
        if (isExpandBtnShow && !isExpand) {
            houseIntroStr = houseIntroStr.substr(0, 150) + '...';
        }

        return (
            <div className={`${classPrefix} ${className}`}>
                <h1 className={`${classPrefix}-title s-housedetail-comptitle`}>房源介绍</h1>
                <div className={`${classPrefix}-intro`}>
                    <p className={textClass}>{houseIntroStr}</p>
                    {
                        isExpandBtnShow ? 
                            <span
                                onTouchTap={this.handleExpandTap}
                                className={`${classPrefix}-expandbtn f-display-inlineblock`}
                            >
                                {
                                    !isExpand ? '展开' : '收起'
                                }
                            </span>
                            : null
                    }
                </div>
            </div>
        )
    }
}

export default HouseIntro;
