import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import './styles.less';
import { withHistory } from 'application/App/routes';
import { createCommentInputPath } from 'application/App/Comment';

const classPrefix = 'm-commentcard';

class CommentCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleTouchTap = () => {
        this.goCommentInput('9090909090');
    }

    goCommentInput = rentUnitId => withHistory(this.props.history)(createCommentInputPath)(rentUnitId)

    render() {
        return (
            <div className={`${classPrefix}`}>
                <div onTouchTap={this.handleTouchTap}>去评论</div>
            </div>
        );
    }
}

export default withRouter(CommentCard);
