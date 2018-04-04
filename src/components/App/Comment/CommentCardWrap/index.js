import React from 'react';
import { commentStorage } from 'application/App/storage';

export default function CommentCardWrap(WrappedComponent) {
    const data = commentStorage.get();
    return props => (
        <WrappedComponent {...props} {...data} />
    );
}
