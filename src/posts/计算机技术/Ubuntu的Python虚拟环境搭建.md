---
title: Ubuntu的Python虚拟环境搭建
author: 沉默的子龙君
date: 2023-09-21 09:21:54
categories: 
- 计算机技术
tags:
- linux
- ubuntu
- python
---
## <p align=center>为什么要使用虚拟环境</p>

这很好理解，不同的项目需要依赖于不同的环境要求，项目中有可能会使用不同的python版本，使用各式各样的第三方包等。如果将这些依赖塞进同一个地方则会显得杂乱无章，管理起来异常繁琐。而虚拟环境将各个项目所需要的依赖隔离起来，使其拥有自己独立的运行环境，不会和其他环境冲突。

## <p align=center>开始搭建虚拟环境</p>

### 1.检查python环境

确保你的linux服务器上已经安装了python,（这里的python默认指python3，python2在笔者的系列文章中已被弃用，甚至可以说已被很多人弃用）。对于不同的linux发行版本，搭建python虚拟环境的方式均有一定差异，这里以笔者使用的Ubuntu 20.04.6作为示例。

输入命令 `python3 -V` 查看已经安装的python版本。如果你没有安装python，那么系统就会提示没有“python3”这个命令，需要自行下载编译安装。

### 2.安装pip

如果你的服务器是新装的，或者说你已经太久没有更新过依赖包，那么就需要先输入命令：

`sudo apt update`

这个操作将会从云端拉取可用的包到本地。

接下来输入命令安装pip：

`apt install python3-pip -y`

等待安装完成即可。输入 `pip3 -V` 查看安装的pip版本。

### 3.安装pip3 install virtualenvwrapper

virtualenvwrapper是一个相对轻量的python包管理器。输入以下命令来安装：

`pip3 install virtualenvwrapper -y`

安装完成之后，我们需要知道它的安装路径：

`which virtualenvwrapper.sh`

这将打印出virtualenvwrapper的安装路径，笔者这里终端输出：

    /usr/local/bin/virtualenvwrapper.sh

### 4.配置环境变量

用vim打开bashrc文件：

`sudo vi ~/.bashrc`

按“i”键进入insert模式，在文件的末尾粘贴以下配置：

    export VIRTUALENVWRAPPER=/usr/bin/python3
    export WORKON_HOME=/home/venv
    export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
    source /usr/local/bin/virtualenvwrapper.sh

**注意，其中最后一行“source”后面的路径应替换为你自己的virtualenvwrapper的实际安装路径。**

按“Esc”键退出编辑模式，输入 `:wq` 回车来保存对文件的编辑。

之后输入以下命令使更改生效：

`source ~/.bashrc`

至此，virtualenvwrapper的安装与配置完成，可以开始使用了。

## <p align=center>使用virtualenvwrapper的命令</p>

只需要输入以下命令就可以实现对虚拟环境的相关操作：

*   创建虚拟环境：`mkvirtualenv [虚拟环境名称]`
*   启用虚拟环境：`workon [虚拟环境名称]`
*   列出虚拟环境：`lsvirtualenv`
*   退出虚拟环境：`deactivate`
*   删除虚拟环境：`rmvirtualenv [虚拟环境名称]`

一般我们只需要使用 `mkvirtualenv [name]` 来为某个项目新建一个虚拟环境。之后如果需要启用这个环境，直接 `workon [name]` 即可，非常便利。