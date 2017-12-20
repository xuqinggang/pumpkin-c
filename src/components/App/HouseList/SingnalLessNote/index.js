import React, { Component } from 'react';
import './style.less';

const clsPrefix = 'm-singalless-note';

export default class SingnalLessNote extends Component {
    render() {
        return (
            <div className={clsPrefix}>
                <i className={`${clsPrefix}--icon`} />
                <div className={`${clsPrefix}--text`}>网络加载失败，请检查网络设置</div>
            </div>
        );
    }
}
