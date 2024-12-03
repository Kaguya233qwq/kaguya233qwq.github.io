---
title: 使用cloudflare搭建万能反向代理
date: 2023-09-20 17:04:31
categories: 
- 计算机技术
tags:
- 反向代理
- cloudflare
---

# 使用cloudflare搭建万能反向代理

## 注册域名

首先你需要注册一个域名，注册的过程这里不再叙述，笔者使用的是在阿里云注册的域名

## 在cloudflare添加域名解析记录并配置DNS

1.点击侧边栏的“网站”选项，并点击“添加站点”按钮

2.等待扫描添加解析记录，可以添加一条用来专门用作反向代理的名叫“proxy”的子域名记录

3.去你的域名注册商后台，选择DNS解析服务，将原来的DNS地址修改为cloudflare的地址

- armfazh.ns.cloudflare.com

- kelly.ns.cloudflare.com

4.耐心等待DNS解析生效

这时你的域名就已经成功添加到cloudflare了

## 配置Workers

接下来的操作使用到了[cloudflare-reverse-proxy](https://github.com/gaboolic/cloudflare-reverse-proxy)这个开源项目

1.点击侧边栏“Workers 和 Pages”选项下的“概述”，点击“创建应用程序”并点击“创建Workers”

2.输入名称，点击“部署”按钮

3.点击你刚才创建的workers，点击“快速编辑”按钮

4.将项目中的_worker.js文件里的代码全部复制粘贴进去

5.点击部署，这样反向代理就搭建好了

## 配置自定义域名

上面部署完成的地址是cloudflare自动生成的地址，有点不太优雅，如果我们需要配置自己的域名就需要进行以下操作

1.点击“触发器”选项卡，点击“添加自定义域”按钮

2.输入刚刚解析到cloudflare的你自己的域名，点击添加即可