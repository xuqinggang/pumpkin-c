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

        // showIntroStr = showIntroStr && showIntroStr.split('\n').join('<br />');

        return (
            <div className={classnames(classPrefix, className)}>
                {/* <p className={`${classPrefix}-text`} style={{ color }}>{showIntroStr}</p> */}
                <pre className={`${classPrefix}-text`} style={{ color }}>{showIntroStr}</pre>
                {
                    isExpandBtnShow ?
                        <span
                            onTouchTap={this.handleExpandTap}
                            className={`${classPrefix}-expandbtn f-display-inlineblock`}
                            data-event-track-click
                            data-event-track-param-element={
                                !isExpand ?
                                    (
                                        this.props.type === 'apartment' ?
                                        'DETAIL_APARTMENT_INTRODUCE_UNFOLD'
                                        : 'DETAIL_HOUSE_INTRODUCE_UNFOLD'
                                    )
                                    : (
                                        this.props.type === 'apartment' ?
                                        'DETAIL_APARTMENT_INTRODUCE_COLLAPSE'
                                        : 'DETAIL_HOUSE_INTRODUCE_COLLAPSE'
                                    )
                            }
                            data-event-track-param-page="HOUSE_DETAIL"
                            data-event-track-param-event="CLICK"
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
