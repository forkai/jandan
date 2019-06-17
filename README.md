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

## 目前问题

1. 只支持热榜板块，随手拍、动物园、物料图暂不支持
2. 热榜的优评等文字爬虫没有写；
3. stream下载耗时不准确。