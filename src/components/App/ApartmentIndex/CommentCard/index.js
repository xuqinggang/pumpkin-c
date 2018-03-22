import React, { PureComponent } from 'react';
import './styles.less';

const classPrefix = 'm-commentcard';

export default class CommentCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <p>批量</p>
            </div>
        );
    }
}
