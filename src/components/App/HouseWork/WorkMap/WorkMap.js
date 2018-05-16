import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { dynamicScript } from 'lib/util';

import './styles.less';

const classPrefix = 'm-workmap';

export default class WorkMap extends PureComponent {
    componentDidMount() {
        const {
            lnglat,
        } = this.props;

        dynamicScript('//webapi.amap.com/maps?v=1.4.2&key=2b979fbadc2bbafb74d58fec71a9f98a', () => {
            dynamicScript('//webapi.amap.com/ui/1.0/main.js?v=1.0.11', () => {
                AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
                    const map = new AMap.Map('container', {
                        zoom: 16,
                        scrollWheel: false,
                    });

                    const positionPicker = new PositionPicker({
                        mode: 'dragMap',
                        map,
                    });

                    positionPicker.on('success', (positionResult) => {
                        console.log('positionResult', positionResult);
                    });

                    positionPicker.on('fail', (positionResult) => {
                    });

                    positionPicker.start(new AMap.LngLat(...lnglat));
                });
            });
        });
    }

    render() {
        return (
            <div>
                <div id="container" />
            </div>
        );
    }
}
