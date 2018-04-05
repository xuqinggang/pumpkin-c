import React from 'react';
import { commentStorage } from 'application/App/storage';

export default function CommentCardWrap(WrappedComponent) {
    return (props) => {
        const data = commentStorage.get();
        if (data && Array.isArray(data) && data.length > 0) {
            return (
                <WrappedComponent {...props} {...data[data.length - 1]} />
            );
        }

        return null;
    };
}
