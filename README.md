# jiandan

煎蛋网爬虫，目前只提供热榜板块的下载。


## 使用方法

当作CLI工具使用：
```bash
# 安装
npm i -g jandan
# 下载热榜-无聊图
jandan -r
# 下载热榜-四小时热门
jandan -r 4
# 下载热榜-吐槽
jandan -r t
# 下载热榜-随手拍
jandan -r o
# 下载热榜-动物园
jandan -r z
# 下载热榜-优评（暂不支持）
jandan -r c
# 下载热榜-三日最佳
jandan -r 3
# 下载热榜-七日最佳
jandan -r 7
```


## TODO

1. Web UI
2. 使用了es modules改写
3. 使用TypeScript重构
4. 暂时支持热榜板块，即将支持随手拍、动物园、物料图
5. 支持热榜的优评等文字内容
6. 更精确的stream下载耗时不准确
7. 控制并发和请求的延时
8. 下载进度条
