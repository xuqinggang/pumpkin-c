import React, { Component } from 'react';
import classnames from 'classnames';
import { parseUrl } from 'lib/util';

import './styles.less';

const trafficMapInfo = {
    subway: {
        text: '附近地铁',
        iconClass: 'icon-subway',
        key: '地铁',
        markers: [],
    },
    bus: {
        text: '附近公交',
        iconClass: 'icon-bus',
        key: '公交',
        markers: [],
    },
    sport: {
        text: '运动场所',
        iconClass: 'icon-entertainment',
        key: '运动',
        markers: [],
    },
    life: {
        text: '品质生活',
        iconClass: 'icon-life',
        key: '休闲 生活',
        markers: [],
    },
};

const classPrefix = 'm-trafficaround';
const aroundBtnClass = 'm-arroundbtn';

// 保存上一次点击的marker text文字
let lastMarkerTextDom = null;

// 设置中心marker样式
function setCenterMarker(lnglatArr, mapIns) {
    // 自定义点标记内容
    var markerContent = document.createElement("div");

    // 点标记中的图标
    var markerImg = document.createElement("img");
    markerImg.className = `${classPrefix}-center-img`;
    markerImg.src = "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png";
    markerContent.appendChild(markerImg);

    // 点标记中的文本
    // var markerSpan = document.createElement("span");
    // markerSpan.className = `${classPrefix}-center-text`;
    // markerSpan.innerHTML = "！";
    // markerContent.appendChild(markerSpan);
    let marker = new AMap.Marker({
        position: lnglatArr,
        map: mapIns,
        content: markerContent,
        clickable: true,
    });

    // AMap.event.addListener(marker, 'click', function() {
    //     var markerSpan = document.createElement("span");
    //     markerSpan.innerHTML = "123";
    //     markerContent.appendChild(markerSpan);
    //     marker.setContent(markerContent);
    // });
}

function bindMarkerClick(marker) {
    AMap.event.addListener(marker, 'click', function() {
        if (lastMarkerTextDom) {
            lastMarkerTextDom.style.display = 'none';
        }

        const markContentDom = marker.getContent();
        const markerTextDom = markContentDom.querySelector('.marker-text-wrap');
        markerTextDom.style.display = 'inline-block';
        lastMarkerTextDom = markerTextDom;
    });
}

class TrafficAround extends Component {
    constructor(props) {
        super(props);
        const urlInfo = parseUrl(window.location.href);
        const pos = urlInfo.query.pos;
        this.centerLnglatArr = [];
        if (pos) {
            this.centerLnglatArr = pos.split(',');
        }

        // 房源经纬度
        this.centerLnglatArr = [116.39,39.9];
        
        // 保存每次点击前的上一次点击的trafficName
        this.lastTrafficName = '';
    }

    searchNearBy(trafficName) {
        const trafficInfoItem = trafficMapInfo[trafficName];
        if (!trafficInfoItem) return ;
        
        // 上次点击和这次点击的相同
        if (this.lastTrafficName === trafficName) return;

        // 将上次点击，显示的marker隐藏
        if (this.lastTrafficName) {
            trafficMapInfo[this.lastTrafficName].markers.forEach((marker) => {
                marker.hide();
            })
        }
        this.lastTrafficName = trafficName;

        if (trafficInfoItem.markers.length) {
            trafficInfoItem.markers.forEach((marker) => {
                marker.show();
            });
            return ;
        }

        AMap.service('AMap.PlaceSearch', () => {
            //实例化PlaceSearch
            let placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                pageSize: 8,
                zoom: 15,
                continuousZoomEnable: true,
                pageIndex: 1
            });

            placeSearch.searchNearBy(trafficInfoItem.key, [116.39, 39.9], 2000, (status, result) => {
                console.log('result', result);
                if (status === 'complete' && result.info === 'OK') {
                    //附近数据
                    const pois = result.poiList.pois;
                    const len = pois.length;
                    for (let i = 0; i < len; i ++) {
                        const position = [pois[i].location.lng, pois[i].location.lat];

                        const markContent = document.createElement('div');
                        markContent.className = 'marker-content';
                        const markerIcon = document.createElement("span");
                        markerIcon.className = `marker-icon marker-icon-${trafficName}`;
                        const markerTextWrap = document.createElement('div');
                        markerTextWrap.className = 'marker-text-wrap';
                        markerTextWrap.innerHTML = `<i class='arrow'></i><span class='text'>${pois[i].name}</span>`;
                        // const markerText = document.createElement("span");
                        // markerText.innerText = pois[i].name;
                        // markerText.className = 'marker-text';
                        
                        markContent.appendChild(markerIcon);
                        markContent.appendChild(markerTextWrap);

                        const marker = new AMap.Marker({
                            position: position,
                            map: this.mapIns,
                            content: markContent,
                        });

                        // 给mark绑定点击事件
                        bindMarkerClick(marker);
                        
                        // marker.content = markerSpan;
                        trafficMapInfo[trafficName].markers.push(marker);
                    }
                } else {
                    console.log('查询结果没拿到')
                }
            });

        });

    }

    componentDidMount() {
        if (!this.centerLnglatArr.length) return;
        // 引入地图
        this.mapIns = new AMap.Map('container',{
            zoom: 15,
            center: this.centerLnglatArr,
        });

        // 设置中心marker样式
        setCenterMarker(this.centerLnglatArr, this.mapIns);
    }

    onBtnTap = (trafficName) => {
        // 恢复到地图原本中心位置
        this.mapIns.setCenter(this.centerLnglatArr);

        this.searchNearBy(trafficName);
    };

    render() {
        return (
            <div>
                <div id="container"></div>
                <ArroundBtn onBtnTap={this.onBtnTap} />
            </div>
        );
    }
}

// 地图上的附近按钮
class ArroundBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTraffice: '',
        }
    }

    handleBtnTap = (trafficName) => {
        this.setState({
            activeTraffice: trafficName,
        });
        if (this.props.onBtnTap) {
            this.props.onBtnTap(trafficName);
        }
    }

    renderBtn() {
        const { activeTraffice } = this.state;

        return Object.keys(trafficMapInfo).map((trafficName, index) => {
            const trafficInfo = trafficMapInfo[trafficName];
            const btnClass = classnames(`${aroundBtnClass}-btn`, {
                'btn-active': trafficName === activeTraffice,
            });

            return (
                <li
                    key={index}
                    className={`${aroundBtnClass}-item`}
                    onTouchTap={this.handleBtnTap.bind(this, trafficName)}
                >
                    <div className={btnClass}>
                        <span
                            className={`f-display-inlineblock f-vertical-middle ${trafficInfo.iconClass} ${aroundBtnClass}-icon`}
                        >
                        </span>
                        {
                            trafficName === activeTraffice ?
                                <span className={`f-display-inlineblock f-vertical-middle ${aroundBtnClass}-text`}>
                                    {trafficInfo.text}
                                </span>
                                : null
                        }
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <div className={`${aroundBtnClass}`}>
                <ul>
                    { this.renderBtn() }
                </ul>
            </div>
        )
    }
}

export default TrafficAround;
