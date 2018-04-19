# install
npm install pumpkin-font-c --registry=http://10.10.126.140:4873
npm install

# 开发环境(客户端渲染)
`npm run dev`

# 本地server(服务器端渲染)

```sh
npm run build_test
npm run build_render_test
npm run server_dev

# 或者使用
npm run build_test && npm run build_render_test && npm run server_dev
```

# 线上test环境(服务器端渲染) nginx代理接口
```sh
npm run build_test
npm run build_render_test
npm run server
```

# docker 线上production环境 nginx代理接口
```sh
npm run build_production
npm run build_render_production
npm run server
```

# 生产环境sentry日志
http://sentryjs.kuaizhan.sohuno.com/sentry/nanguapumpkin-c-online/


# 筛选参数,转换成url
字母l当做每个类型多选的连接符号
短横线-当做每个类型的连接符
(除区域和地铁数字代表id外，其余数字代表索引))

## 位置筛选
区域: a8131-b123
地铁: c6352-d123

## 租金筛选
e2000l5000(2000~5000, 用字母l分割)

## 房型
合租: f4l9
整租: g1l5

## 多选
朝向: h2l4
标签: j4l3
面积: k1l4
楼层: n1l3
## 
