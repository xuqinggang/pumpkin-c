import React, { PureComponent } from 'react';

const classPrefix = 'g-commentlist';

export default class CommentList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <p>评论列表</p>
            </div>
        );
    }
}
