import React, { PureComponent } from 'react';

import { PureCommentList } from 'components/App/Comment';
import EasyHead from 'Shared/EasyHead';
import { getDocHeight, getScrollTop, dynamicDocTitle, getQueryString } from 'lib/util';
import { ajaxGetCommentList, ajaxGetComment } from '../ajaxInitComment';
import { isLikeNativeView } from 'lib/const';
import { goHouseList } from 'application/App/routes/routes';

import './styles.less';

const classPrefix = 'g-commentlist';

const upgradeComment = (comments, selfComment) => {
    if (!selfComment || !selfComment.id) {
        return comments;
    }
    const selfCommentId = selfComment.id;
    const newComments = comments.filter(comment => comment.id !== selfCommentId);
    return [selfComment, ...newComments];
};

const newCommentIdKey = 'newCommentId';

export default class CommentList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selfComment: null,
            comments: [],
            pager: {
                curPage: 1,
                totalPage: 1,
            },
            loading: false,
        };
        this.selfCommentId = getQueryString(window.location.href, newCommentIdKey);
    }

    goHouseList = goHouseList(this.props.history);

    onLoadMore = () => {
        this.fetchData();
    }

    handleLoadMore = () => {
        const reserveSize = 200;
        const scrollTop = getScrollTop();
        if (scrollTop > this.lastScrollTop) {
            // 向下滚动
            if ((getDocHeight() - window.innerHeight - scrollTop) <= reserveSize) {
                const { curPage, totalPage } = this.state.pager;
                if (curPage <= totalPage) {
                    this.onLoadMore();
                }
            }
        }
        this.lastScrollTop = scrollTop;
    }

    fetchData = (renew = false) => {
        if (this.state.loading) {
            return;
        }
        
        const { apartmentId } = this.props;
        const { pager, comments } = this.state;
        const { curPage } = pager;

        this.setState({
            loading: true,
        });
        ajaxGetCommentList(apartmentId, pager).then((data) => {
            let newComments;

            if (!renew) {
                newComments = [...comments, ...data.comments];
            } else {
                newComments = data.comments;
            }

            const newPager = {
                curPage: curPage + 1,
                totalPage: data.totalPage,
            };

            this.setState({
                comments: newComments,
                pager: newPager,
            });
        }).finally(() => {
            this.setState({
                loading: false,
            });
        });
    }

    componentWillMount() {
        this.fetchData(true);
        ajaxGetComment(this.selfCommentId).then((data) => {
            this.setState({
                selfComment: data,
            });
        });
        dynamicDocTitle('公寓评价');
    }

    componentDidMount() {
        const commentListDom = document.getElementsByClassName('g-commentlist');
        commentListDom[0].style['overflow-x'] = 'hidden';
        window.addEventListener('scroll', this.handleLoadMore);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleLoadMore);
    }

    render() {
        const { history, apartmentId } = this.props;
        const { comments, loading, selfComment } = this.state;

        const composedComments = upgradeComment(comments, selfComment);

        return (
            <div className={`${classPrefix}`}>
                {
                    !isLikeNativeView() &&
                    <EasyHead
                        backToSomewhere={this.goHouseList}
                        renderRight={() => (
                            <span className={`${classPrefix}-title f-singletext-ellipsis`}>公寓评价</span>
                        )}
                    />
                }
                { composedComments.length === 0 && !loading &&                 
                    <div className={`${classPrefix}-empty g-grid-col f-flex-align-center`}>
                        <img src={require('./images/comment-empty.png')} alt="" />
                        <p className="no-comment">暂无评价</p>
                    </div>
                }
                <PureCommentList comments={composedComments} />
                {
                    loading && <p className="loading">加载中...</p>
                }
            </div>
        );
    }
}
