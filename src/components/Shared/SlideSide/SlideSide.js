import React, { PureComponent } from 'react';
import PRoll from 'Shared/SimpleScroll/lib';

import './styles.less';

const classPrefix = 'm-slideside';

export default class SlideSide extends PureComponent {
    componentDidMount() {
        console.log('SimpleScroll componentDidMount');
        this.scrollIns = new PRoll(this.wrapperDom, {
            isScrollY: false,
            isScrollX: true,
            // isBounce: false,
        });
        // console.log(this.scrollIns.maxScrollX);
        //         this.scrollIns.scrollTo(this.scrollIns.maxScrollX, 0, 100);
        
        this.scrollIns.on('scroll', () => {
        })
        this.scrollIns.on('scrollEnd', () => {
            if (this.scrollIns.position.translateX < -20) {
                this.scrollIns.scrollTo(this.scrollIns.maxScrollX, 0, 100);
            } else {
                this.scrollIns.scrollTo(0, 0, 100);
            }
        })
    }

    render() {
        const { 
            children,
            className,
        } = this.props;
        return (
            <div className={classPrefix}>
                <div ref={(dom) => {this.wrapperDom = dom;}} className={`${classPrefix}-wrapper`}>
                    <div className="scroller">
                        <div className="f-display-inlineblock content">
                            <div>内容</div>
                            <div>内容1</div>
                            <div>内容2</div>
                            <div>内容</div>
                        </div>
                        <div className="f-display-inlineblock del">删除</div>
                    </div>
                </div>
            </div>
        );
    }
}
