import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Switch } from 'react-router';
import path from 'path';
import Router from 'koa-router';
import views from 'koa-views';

import './lib/hack';
import Service from 'lib/Service';
import routerConfig from 'application/App/routes/config';
import allRouters from './router';
import assets from '../dist/assets.json';

const router = new Router();

function serverRenderConf(app) {
    console.log('serverRenderConf');
    // views template
    app.use(views(path.resolve(__dirname, '../../src/views'), {
        map: {
            html: 'handlebars'
        }
    }));

    // router entry
    router.use('/:cityName/nangua',
        async (ctx, next) => {
            console.log('ctx', ctx.request.url);
            window.location.href = ctx.request.url;
            Service.baseConfig = {
                urlPrefix: '/bj/nangua',
            };
            ctx.state.assets = assets;

            await next();
        },
        allRouters.routes(),
        allRouters.allowedMethods(),
        async (ctx, next) => {
            console.log('server ctx')
            const context = {};
            const content = ReactDOMServer.renderToString(
                <StaticRouter
                    context={context}
                    location={ctx.request.url}
                >
                    { routerConfig() }
                </StaticRouter>
            );
            ctx.state.content = content;
            ctx.state.customStore = JSON.stringify(window.customStore);

            await ctx.render('index');
        });
    
    app.use(router.routes());
}

export default serverRenderConf;
