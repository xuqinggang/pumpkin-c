import React, { PureComponent } from 'react';

import { PureCommentList } from 'components/App/Comment';
import { ajaxGetCommentList } from '../ajaxInitComment';

import { getDocHeight, getScrollTop } from 'lib/util';

const classPrefix = 'g-commentlist';

export default class CommentList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            pager: {
                curPage: 1,
                totalPage: 1,
            },
        };
    }


    onLoadMore = () => {
        console.log('more');
        this.fetchData();
    }

    handleLoadMore = () => {
        const reserveSize = 200;
        const scrollTop = getScrollTop();
        if (scrollTop > this.lastScrollTop) {
            // 向下滚动
            if ((getDocHeight() - window.innerHeight - scrollTop) <= reserveSize) {
                const { curPage, totalPage } = this.state.pager;
                if (curPage < totalPage) {
                    this.onLoadMore();
                }
            }
        }
        this.lastScrollTop = scrollTop;
    }

    fetchData = (renew = false) => {
        const { pager: { curPage }, comments } = this.state;

        ajaxGetCommentList().then((data) => {
            let newComments;
            let newPager;

            if (!renew) {
                newComments = [...comments, ...data.comments];
                newPager = {
                    curPage: curPage + 1,
                    totalPage: data.total,
                };
            } else {
                newComments = data.comments;
                newPager = {
                    curPage: 1,
                    totalPage: 1,
                };
            }

            this.setState({
                comments: newComments,
                pager: newPager,
            });
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleLoadMore);
        this.fetchData(true);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleLoadMore);
    }

    render() {
        const { comments } = this.state;
        return (
            <div className={`${classPrefix}`}>
                <PureCommentList comments={comments} />
            </div>
        );
    }
}
