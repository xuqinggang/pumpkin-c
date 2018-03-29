'use strict';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Switch } from 'react-router';
import path from 'path';
import Router from 'koa-router';
import views from 'koa-views';

import './lib/hack';
import logTime from './lib/logTime';
import Service from 'lib/Service';

import routerConfig from 'application/App/routes/config';
import allRouters from './router';
import { prefixMapCityId } from 'config/config';

import assets from '../dist/assets.json';

import windowMiddle from './middleware/window.middle';

const router = new Router();

function serverRenderConf(app) {
    global.app = app;
    // views template
    app.use(views(path.resolve(__dirname, '../../src/views'), {
        map: {
            html: 'handlebars',
        }
    }));

    // router entry
    router.use('/:cityName/nangua',
        windowMiddle(),
        async (ctx, next) => {
            window.location.href = ctx.request.url;
            ctx.state.cityId = prefixMapCityId[ctx.params.cityName];
            ctx.state.assets = assets;
            await next();
        },
        ...logTime(allRouters.routes()),
        allRouters.allowedMethods(),
        async (ctx, next) => {
            const context = {};
            const start = Date.now();
            const content = ReactDOMServer.renderToString(
                <StaticRouter
                    context={context}
                    location={ctx.request.url}
                >
                    { routerConfig() }
                </StaticRouter>
            );
            // log
            const end = Date.now();
            global.app.emit('render', `ReactDOMServer renderToString-${ctx.request.url} responseTime-${end-start}ms`);

            ctx.state.content = content;
            ctx.state.customStore = JSON.stringify(window.customStore);
            await ctx.render('index');
        });
    
    app.use(router.routes());
}

export default serverRenderConf;
