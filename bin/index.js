#!/usr/bin/env node
const { argv } = require('yargs')
		.alias('v', 'version')
		.alias('h', 'help')
		.alias('d', 'download'),
	jandan = require('../index'),
	{ blue } = require('chalk')

const outputHelpInfo = () => {
	console.log(`${blue('用法:')}
	jandan <命令> [选项]
${blue('选项：')}
	-v, --version   输出版本信息
	-h, --help      输出帮助信息
	-d, --download  下载图片
${blue('参数：')}
	jandan -d    下载无聊图
	jandan -d 4h 下载四小时热门
	jandan -d t   吐槽
	jandan -d o   随手拍
	jandan -d z   动物园
	jandan -d c   优评
	jandan -d 3   三日最佳
	jandan -d 7   七日最佳`)
}

// 没有输入命令
const noArgv = () => {
	if (Object.keys(argv).length == 2 && argv._.length == 0) {
		return true
	}
	return false
}

// 没有输入参数显示帮助信息
noArgv() && outputHelpInfo()

// 输入了txt文件路径
argv.d && jandan(argv.d)
