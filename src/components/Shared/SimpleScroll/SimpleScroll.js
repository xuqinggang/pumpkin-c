import React, { PureComponent } from 'react';
import PRoll from './lib';

export default class SimpleScroll extends PureComponent {
    constructor(props) {
        super(props);
        this.activeIndex = props.activeIndex;
    }
    componentDidMount() {
        this.scrollIns = new PRoll(this.wrapperDom, {
            isScrollY: false,
            isScrollX: true,
        });
    }
    render() {
        const { 
            children,
            className,
        } = this.props;
        return (
            <div ref={(dom) => {this.wrapperDom = dom;}} className={className}>
                { children }
            </div>
        );
    }
}
