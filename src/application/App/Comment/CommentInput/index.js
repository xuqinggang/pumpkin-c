import React, { PureComponent } from 'react';

const classPrefix = 'g-commentinput';

export default class CommentInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <p>评论框就在这</p>
            </div>
        );
    }
}
