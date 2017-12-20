import React, { Component } from 'react';
import './styles.less';

const listClassPrefix = 'm-houselists';
const itemClassPrefix = 'm-houseitem';

export default function HouseLists(props) {
    return (
        <div className={`${listClassPrefix}`}>
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
            <HouseItem />
        </div>
    );
}

function HouseItem(props) {
    return (
        <a href="" className={`${itemClassPrefix} g-grid-row f-flex-justify-center`}>
            <img className={`${itemClassPrefix}-img`} src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3484344818,2921211808&fm=11&gp=0.jpg" alt="" />
            <div className={`${itemClassPrefix}-intro g-grid-col f-flex-justify-between`}>
                <h1 className="intro-title" >
                    双榆树小区-3居室-南
                </h1>
                <div className="intro-brief g-grid-row f-flex-justify-between">
                    <div>
                        <div className="intro-tags">
                            <span className="f-display-inlineblock tags-item">整租</span>
                            <span className="f-display-inlineblock tags-item">90㎡</span>
                            <span className="f-display-inlineblock tags-item">1/6层</span>
                        </div>
                        <span className="f-display-inlineblock intro-pt">距离10号线知春里站500m</span>
                    </div>
                    <div className="intro-price">
                        <span>¥5000</span>
                        <span>/月</span>
                    </div>
                </div>
                <div>
                    <span className="u-houselist-tag-round">随时入住</span>
                    <span className="u-houselist-tag-round">近地铁</span>
                    <span className="u-houselist-tag-round">位置安静</span>
                </div>
            </div>
        </a>
    )
}
