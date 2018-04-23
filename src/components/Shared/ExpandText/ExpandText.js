import React, { PureComponent } from 'react';
import classnames from 'classnames';

import './styles.less';

const classPrefix = 'm-expandtext';

export default class ExpandText extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isExpand: false,
        };
    }

    handleExpandTap = () => {
        this.setState({
            isExpand: !this.state.isExpand,
        });
    }

    render() {
        const {
            className,
            intro,
            color = '#999',
        } = this.props;
        const {
            isExpand,
        } = this.state;

        let showIntroStr = intro;

        const isExpandBtnShow = showIntroStr && showIntroStr.length > 150;
        if (isExpandBtnShow && !isExpand) {
            showIntroStr = showIntroStr.substr(0, 150) + '...';
        }

        return (
            <div className={classnames(classPrefix, className)}>
                <p className={`${classPrefix}-text`} style={{ color }}>{showIntroStr}</p>
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
        );
    }
}
