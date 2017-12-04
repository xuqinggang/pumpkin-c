import React, { Component } from 'react';
import ScrollWrapper from './lib';
import classnames from 'classnames';

import './styles.less';

export default class Scroll extends Component {
    constructor(props) {
        super(props);
        this.activeIndex = props.activeIndex;
    }
    componentDidMount() {
        this.scrollIns = ScrollWrapper(this.scrollEle);
    }
    handleTestClick = () => {
        this.scrollIns.slide(1, false);
    }
    componentWillReceiveProps(nextProps) {
        const { activeIndex } = nextProps;
        if (activeIndex !== undefined) {
            const direction = activeIndex - this.activeIndex > 0;
            this.scrollIns.slide(activeIndex, direction);
            this.activeIndex = activeIndex;
        }
    }
    render() {
        console.log('Scroll render');
        const { children } = this.props;
        return (
            <div className="m-react-scroll" ref={instance => { this.scrollEle = instance }}>
                <div className="react-scroll-container">
                    { children }
                </div>
                <button onClick={this.handleTestClick}>test</button>
            </div>
        );
    }
}
