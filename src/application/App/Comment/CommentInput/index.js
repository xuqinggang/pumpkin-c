import React, { PureComponent } from 'react';

import './styles';

import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';

const classPrefix = 'g-commentinput';

export default class CommentInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = () => {
        console.log('提交');
    }

    render() {
        const { history } = this.props;
        return (
            <div className={`${classPrefix}`}>
                <HouseHead
                    history={history}
                    renderRight={() => (
                        <div className={`${classPrefix}-head-right f-display-flex f-flex-justify-between`}>
                            <span className={`${classPrefix}-title f-singletext-ellipsis`}>{'xxx评论'}</span>
                            <div className={`${classPrefix}-submit f-singletext-ellipsis`} onTouchTap={this.handleSubmit}>提交</div>
                        </div>
                    )}
                />
                <p>评论框就在这</p>
            </div>
        );
    }
}