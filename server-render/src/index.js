import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Switch } from 'react-router';
import Router from 'koa-router';
import views from 'koa-views';

import './lib/hack';
import routerConfig from 'application/App/routes/config';
import allRouters from './router';
import assets from '../dist/assets.json';
// console.log('123', t);
const Koa = require('koa');
const app = new Koa();
const router = new Router();
// const test = ReactDOMServer.renderToString(
//     <div>123</div>
// );
// console.log('test', test);
console.log('__dirname', __dirname)
function serverRenderConf(app) {
    app.use(views(__dirname + '/views', {
        map: {
            html: 'handlebars'
        }
    }));
    router.use('/:cityName/nangua', allRouters.routes(), allRouters.allowedMethods(), async (ctx, next) => {
        ctx.state = {
            title: 'hahah',
            content: '123',
            assets,
        };
        console.log('back');
       // const context = {};
       //  const content = ReactDOMServer.renderToString(
       //      <StaticRouter
       //          context={context}
       //          location='/bj/nangua/detail/123123'
       //      >
       //          { routerConfig() }
       //      </StaticRouter>
       //  );
       //  console.log('content', content);
        // console.log('this.params', ctx.params)
        // // ctx.body = 123;
        // await ctx.render('index', {
        //     content: 'hah',
        //     title: '999',
        // });
    });
    
    app.use(router.routes());
}

serverRenderConf(app);
app.listen(3000);
