// 内置库
const { extname } = require('path')
const { exit } = require('process')
// 外部库
const got = require('got')
const cheerio = require('cheerio')
const chalk = require('chalk')
const fs = require('fs-extra')
// 导入配置文件
const { URL, tabs } = require('../config/index')
const { getRandomEle } = require('./utils')
const headers = require('../config/headers')
const header = getRandomEle(headers)

const jandan = async val => {
	try {
		const name = tabs[val].name
		let url = ''
		// 默认简单无聊图
		if (val == '' || !val) {
			val = ''
		} else if (!tabs[val]) {
			console.error(chalk.red('请输入正确的参数'))
			exit(1)
		} else {
			url = tabs[val].u
		}
		const { body } = await got(URL + tabs[''].u + url, {
			headers: {
				'User-Agent': header,
			},
		})
		const $ = cheerio.load(body)
		// 生成图片链接的数组
		const imgs = $('.text img')
			.map((i, el) => 'http:' + $(el).attr('src'))
			.get()
		console.log(
			`开始下载${chalk.blue(name)},一共${chalk.blue(imgs.length)}张`
		)
		// 创建文件夹
		fs.existsSync('煎蛋网') || fs.mkdirSync('煎蛋网')
		fs.existsSync(`./煎蛋网/${name}/`) || fs.mkdirSync(`./煎蛋网/${name}`)
		// 下载图片
		console.time('下载耗时')
		let imgList = [],
			gifList = []
		imgs.forEach((el, i) => {
			if (extname(el) == '.gif') {
				// 需要把gif中的thumb180转成mw1024，才是真正的gif
				gifList.push(el.replace(/thumb180/, 'mw1024'))
			} else {
				imgList.push(el)
			}
		})
		// gif图片单独放在gif文件夹中
		if (gifList.length) {
			fs.existsSync(`./煎蛋网/${name}/gif`) ||
				fs.mkdirSync(`./煎蛋网/${name}/gif`)
			gifList.forEach((el, i) => {
				got.stream(el).pipe(
					fs.createWriteStream(
						`./煎蛋网/${name}/gif/` + i + extname(el)
					)
				)
			})
		}
		imgList.forEach((el, i) => {
			got.stream(el).pipe(
				fs.createWriteStream(`./煎蛋网/${name}/` + i + extname(el))
			)
		})
		console.timeEnd('下载耗时')
	} catch (err) {
		console.error(chalk.red(err))
		exit(1)
	}
}

module.exports = jandan
