#!/usr/bin/env node

// const { argv } = require('yargs')
// 	.alias('v', 'version')
// 	.alias('h', 'help')
// 	.alias('r', 'rebang')
const yargs = require('yargs')
const chalk = require('chalk')
const jandan = require('../src/index')
const { exit } =require('process')
const {argv} = yargs.alias('v', 'version')
.alias('h', 'help')
.alias('r', 'rebang')

const outputHelpInfo = () => {
	console.log(`${chalk.blue('用法:')}
	jandan <命令> [选项]
${chalk.blue('选项：')}
	-v, --version   输出版本信息
	-h, --help      输出帮助信息
	-r, --rebang    下载热榜板块
${chalk.blue('参数：')}
	jandan -r    下载无聊图
	jandan -r 4 下载四小时热门
	jandan -r t   吐槽
	jandan -r o   随手拍
	jandan -r z   动物园
	jandan -r c   优评(暂不支持)
	jandan -r 3   三日最佳
	jandan -r 7   七日最佳
	jandan -r a 全部下载`)
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

// 根据不同的参数执行不同的爬虫
const run = () => {
	const r = ['', '4', 't', 'o', 'z', 'c', '3', '7']
	if (argv.r === true) {
		jandan('')
	} else if (argv.r in r) {
		jandan(argv.r)
	} else if ((argv.r = 'all')) {
		r.forEach(el => {
			jandan(el)
		})
	} else {
		console.error(chalk.red('参数输入错误'))
		exit(1)
	}
}

run()
