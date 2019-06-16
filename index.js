// 内置库
const { basename, extname } = require('path'),
	{ log, error } = console,
	{ exit } = process
// 外部库
const got = require('got'),
	{ load } = require('cheerio'),
	{ blue, red } = require('chalk'),
	{ createWriteStream, existsSync, mkdirSync } = require('fs-extra')

const URL = 'http://jandan.net/'
const tabs = {
	'': { name: '无聊图', u: 'top' },
	'4h': { name: '四小时热门', u: '-4h' },
	t: { name: '吐槽', u: '-tucao' },
	o: { name: '随手拍', u: '-ooxx' },
	z: { name: '动物园', u: '-zoo' },
	c: { name: '优评', u: '-comments' },
	'3': { name: '三日最佳', u: '-3days' },
	'7': { name: '七日最佳', u: '-7days' }
}

const jandan = async val => {
	try {
		const name = tabs[val].name
		let url = ''
		// 默认简单无聊图
		if (val == '' || !val) {
			val = ''
		} else if (!tabs[val]) {
			error(red('请输入正确的参数'))
			exit(1)
		} else {
			url = tabs[val].u
		}
		const { body } = await got(URL + tabs[''].u + url)
		const $ = load(body)
		// 生成图片链接的数组
		const imgs = $('.text img')
			.map((i, el) => 'http:' + $(el).attr('src'))
			.get()
		log(`开始下载${blue(name)},一共${imgs.length}张`)
		// 创建文件夹
		existsSync(`./${name}/`) || mkdirSync(`./${name}`)
		// 下载图片
		imgs.forEach((el, i) => {
			got.stream(el).pipe(
				createWriteStream(`./${name}/` + i + extname(el))
			)
		})
	} catch (err) {
		error(red(err))
		exit(1)
	}
}

module.exports = jandan
