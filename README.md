# install
npm install pumpkin-font-c --registry=http://10.10.126.140:4873
npm install

# 开发环境(客户端渲染)
npm run dev

# 本地server(服务器端渲染)
npm run build_test
npm run server_render_test
npm run server_test

# 线上test环境(服务器端渲染) nginx代理接口
npm run build_test
npm run server_render_test
npm run server

# docker 线上production环境 nginx代理接口
npm run build_production
npm run server_render_production
npm run server

# 筛选参数，转换成url
竖线|当做分隔符
## 更多筛选面板
朝向 - d
url片段：d1|1|2
标签 - b
b0|2
面积 - a
a0|3
楼层 - f
f3|4

## 房型
合租 - s
s2|3
整租 - z
z3|4

## 租金
p0-3000

## 位置
区域
districts|0|3-7864
0代表，第二级索引为0
3-7864：代表第三级索引为3，id为7864
districts|9-123|0
0代表第三级索引为0


附近
around|1-116.342331,39.963446,1
1代表索引
116.32,39.96经纬度
1 distance

不限
around|0
