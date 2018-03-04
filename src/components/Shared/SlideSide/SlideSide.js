import React, { PureComponent } from 'react';
import PRoll from 'Shared/SimpleScroll/lib';

export default class SlideSide extends PureComponent {
    componentDidMount() {
        this.scrollIns = new PRoll(this.wrapperDom, {
            isScrollY: false,
            isScrollX: true,
            // isBounce: false,
        });
        
        // this.scrollIns.on('scroll', () => {
        // })
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
            <div>
                <div ref={(dom) => {this.wrapperDom = dom;}} className={className}>
                    {children}
                </div>
            </div>
        );
    }
}
