import React, { PureComponent } from 'react';

import { PureCommentList } from 'components/App/Comment'

const classPrefix = 'g-commentlist';

export default class CommentList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <PureCommentList />
            </div>
        );
    }
}
