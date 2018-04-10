import React, { PureComponent } from 'react';

import { PureCommentList } from 'components/App/Comment';
import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';
import { getDocHeight, getScrollTop } from 'lib/util';
import { ajaxGetCommentList } from '../ajaxInitComment';

import './styles.less';

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
            loading: false,
        };
    }


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
                if (curPage < totalPage) {
                    this.onLoadMore();
                }
            }
        }
        this.lastScrollTop = scrollTop;
    }

    fetchData = (renew = false) => {
        const { apartmentId } = this.props;
        const { pager, comments } = this.state;
        const { curPage } = pager;

        this.setState({
            loading: true,
        });
        ajaxGetCommentList(apartmentId, pager).then((data) => {
            let newComments;
            let newPager;

            if (!renew) {
                newComments = [...comments, ...data.comments];
                newPager = {
                    curPage: curPage + 1,
                    totalPage: data.totalPage,
                };
            } else {
                newComments = data.comments;
                newPager = {
                    curPage: 1,
                    totalPage: data.totalPage,
                };
            }

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

    componentDidMount() {
        const commentListDom = document.getElementsByClassName('g-commentlist');
        commentListDom[0].style['overflow-x'] = 'hidden';
        window.addEventListener('scroll', this.handleLoadMore);
        this.fetchData(true);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleLoadMore);
    }

    render() {
        const { history, apartmentId } = this.props;
        const { comments, loading } = this.state;
        return (
            <div className={`${classPrefix}`}>
                <HouseHead
                    history={history}
                    renderRight={() => (
                        <span className={`${classPrefix}-title f-singletext-ellipsis`}>公寓评价</span>
                    )}
                />
                <PureCommentList comments={comments} />
                <p className="loading">加载中...</p>
            </div>
        );
    }
}
