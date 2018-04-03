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
        };
    }


    onLoadMore = () => {
        console.log('more');
        this.fetchData();
    }

    handleLoadMore = () => {
        const reserveSize = 200;
        const scrollTop = getScrollTop();
        console.log(scrollTop, this.lastScrollTop, getDocHeight(), getDocHeight() - window.innerHeight - scrollTop);
        if (scrollTop > this.lastScrollTop) {
            // 向下滚动
            if ((getDocHeight() - window.innerHeight - scrollTop) <= reserveSize) {
                const { curPage, totalPage } = this.state.pager;
                console.log(curPage, totalPage);
                if (curPage < totalPage) {
                    this.onLoadMore();
                }
            }
        }
        this.lastScrollTop = scrollTop;
    }

    fetchData = (renew = false) => {
        const { apartmentId } = this.props;
        const { pager: { curPage }, comments } = this.state;

        ajaxGetCommentList(apartmentId).then((data) => {
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
        });
    }

    componentDidMount() {
        document.body.style['overflow-x'] = 'hidden';
        window.addEventListener('scroll', this.handleLoadMore);
        this.fetchData(true);
    }
    componentWillUnmount() {
        document.body.style['overflow-x'] = 'auto';
        window.removeEventListener('scroll', this.handleLoadMore);
    }

    render() {
        const { history, apartmentId } = this.props;
        const { comments } = this.state;
        return (
            <div className={`${classPrefix}`}>
                <HouseHead
                    history={history}
                    renderRight={() => (
                        <span className={`${classPrefix}-title f-singletext-ellipsis`}>公寓评价</span>
                    )}
                />
                <PureCommentList comments={comments} />
            </div>
        );
    }
}
