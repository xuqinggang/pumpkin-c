import React, { PureComponent } from 'react';
import SimpleScroll from 'Shared/SimpleScroll/SimpleScroll';
import './styles.less';

export default class HouseIndex extends PureComponent {
    componentDidMount() {
        console.log('this.wrapDom', this.wrapDom);
        new SimpleScroll(this.wrapDom);
    }
    render() {
        return (
            <div>
                <div id="wrapper" ref={(dom) => this.wrapDom = dom}>
                    <ul id="scroller">
                        <li>有一美人兮，见之不忘。</li>
                        <li>一日不见兮，思之如狂。</li>
                        <li>一日不见兮，思之如狂。</li>
                        <li>一日不见兮，思之如狂。</li>
                        <li>凤飞翱翔兮，四海求凰。</li>
                        <li>无奈佳人兮，不在东墙。</li>
                        <li>将琴代语兮，聊写衷肠。</li>
                        <li>何日见许兮，慰我彷徨。</li>
                        <li>愿言配德兮，携手相将。</li>
                        <li>凤飞翱翔兮，四海求凰。</li>
                        <li>无奈佳人兮，不在东墙。</li>
                        <li>将琴代语兮，聊写衷肠。</li>
                        <li>何日见许兮，慰我彷徨。</li>
                        <li>愿言配德兮，携手相将。</li>
                        <li>凤飞翱翔兮，四海求凰。</li>
                        <li>无奈佳人兮，不在东墙。</li>
                        <li>将琴代语兮，聊写衷肠。</li>
                        <li>何日见许兮，慰我彷徨。</li>
                        <li>愿言配德兮，携手相将。</li>
                        <li>不得於飞兮，使我沦亡。</li>
                    </ul>
                </div>
            </div>
        )
    }
}
