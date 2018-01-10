import React, { PureComponent } from 'react';
import SimpleScroll from 'Shared/SimpleScroll/SimpleScroll';
import './styles.less';

export default class HouseIndex extends PureComponent {
    componentDidMount() {
        console.log('this.wrapDom', this.wrapDom);
        new SimpleScroll(this.wrapDom);
        new SimpleScroll(this.wrapDomx, {
            isScrollY: false,
            isScrollX: true,
        });
    }
    render() {
        return (
            <div>
                <div id="wrapper" ref={(dom) => this.wrapDom = dom}>
                    <ul id="scroller">
                        <li>1有一美人兮，见之不忘。</li>
                        <li>2一日不见兮，思之如狂。</li>
                        <li>3一日不见兮，思之如狂。</li>
                        <li>4一日不见兮，思之如狂。</li>
                        <li>5凤飞翱翔兮，四海求凰。</li>
                        <li>6无奈佳人兮，不在东墙。</li>
                        <li>7将琴代语兮，聊写衷肠。</li>
                        <li>8何日见许兮，慰我彷徨。</li>
                        <li>10愿言配德兮，携手相将。</li>
                        <li>11凤飞翱翔兮，四海求凰。</li>
                        <li>12无奈佳人兮，不在东墙。</li>
                        <li>13将琴代语兮，聊写衷肠。</li>
                        <li>14何日见许兮，慰我彷徨。</li>
                        <li>15愿言配德兮，携手相将。</li>
                        <li>15凤飞翱翔兮，四海求凰。</li>
                        <li>16无奈佳人兮，不在东墙。</li>
                        <li>17将琴代语兮，聊写衷肠。</li>
                        <li>18何日见许兮，慰我彷徨。</li>
                        <li>19愿言配德兮，携手相将。</li>
                        <li>20不得於飞兮，使我沦亡。</li>
                        <li>21有一美人兮，见之不忘。</li>
                        <li>22一日不见兮，思之如狂。</li>
                        <li>23一日不见兮，思之如狂。</li>
                        <li>24一日不见兮，思之如狂。</li>
                        <li>25凤飞翱翔兮，四海求凰。</li>
                        <li>9无奈佳人兮，不在东墙。</li>
                        <li>9将琴代语兮，聊写衷肠。</li>
                        <li>9何日见许兮，慰我彷徨。</li>
                        <li>9愿言配德兮，携手相将。</li>
                        <li>9凤飞翱翔兮，四海求凰。</li>
                        <li>9无奈佳人兮，不在东墙。</li>
                        <li>9将琴代语兮，聊写衷肠。</li>
                        <li>9何日见许兮，慰我彷徨。</li>
                        <li>9愿言配德兮，携手相将。</li>
                        <li>9凤飞翱翔兮，四海求凰。</li>
                        <li>9无奈佳人兮，不在东墙。</li>
                        <li>9将琴代语兮，聊写衷肠。</li>
                        <li>9何日见许兮，慰我彷徨。</li>
                        <li>9愿言配德兮，携手相将。</li>
                        <li>10不得於飞兮，使我沦亡。</li>
                    </ul>
                </div>

                <div id="wrapperx" ref={(dom) => { this.wrapDomx = dom }}>
                    <ul id="scrollerx">
                        <li>1有一美人兮，见之不忘。</li>
                        <li>2一日不见兮，思之如狂。</li>
                        <li>3一日不见兮，思之如狂。</li>
                        <li>4一日不见兮，思之如狂。</li>
                        <li>5凤飞翱翔兮，四海求凰。</li>
                        <li>6无奈佳人兮，不在东墙。</li>
                        <li>7将琴代语兮，聊写衷肠。</li>
                        <li>8何日见许兮，慰我彷徨。</li>
                        <li>10愿言配德兮，携手相将。</li>
                        <li>11凤飞翱翔兮，四海求凰。</li>
                        <li>12无奈佳人兮，不在东墙。</li>
                        <li>13将琴代语兮，聊写衷肠。</li>
                        <li>14何日见许兮，慰我彷徨。</li>
                        <li>15愿言配德兮，携手相将。</li>
                        <li>15凤飞翱翔兮，四海求凰。</li>
                        <li>16无奈佳人兮，不在东墙。</li>
                        <li>17将琴代语兮，聊写衷肠。</li>
                        <li>18何日见许兮，慰我彷徨。</li>
                        <li>19愿言配德兮，携手相将。</li>
                        <li>20不得於飞兮，使我沦亡。</li>
                        <li>21有一美人兮，见之不忘。</li>
                        <li>22一日不见兮，思之如狂。</li>
                    </ul>
                </div>
            </div>
        )
    }
}
