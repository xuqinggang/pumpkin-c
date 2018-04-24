import React, { Component } from 'react';
import { commentQueueStorage } from 'application/App/storage';

export default function CommentCardWrap(WrappedComponent) {
    return class CommentCard extends Component {
        constructor(props) {
            super(props);
            this.state = {
                remindComments: [],
            };
        }
        handleClose = () => {
            const { remindComments } = this.state;

            remindComments.shift();
            console.log('commentQueueStorage', remindComments);
            commentQueueStorage.shift();

            this.setState({
                remindComments,
            });
        }
        componentWillMount() {
            const remindComments = commentQueueStorage.get();
            this.setState({
                remindComments,
            });
        }
        render() {
            const { props } = this;
            const { remindComments } = this.state;
            if (remindComments && Array.isArray(remindComments) && remindComments.length > 0) {
                return (
                    <WrappedComponent
                        {...props}
                        {...remindComments[remindComments.length - 1]}
                        handleClose={this.handleClose}
                    />
                );
            }
            return null;
        }
    };
}
