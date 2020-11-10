// 引入http模块
const http = require('http')
const cheerio = require('cheerio')
const download = require('download')

const HOST = 'http://web.itheima.com'

// 创建请求对象(此时未发送请求)
let req = http.request(HOST + '/teacher.html', res => {
    // 异步响应

    let chunks = []

    // 监听data事件，获取传递过来的数据片段
    res.on('data', chunk => {
        chunks.push(chunk)
    })

    // 监听end事件，数据获取完毕时触发
    res.on('end', () => {
        // 拼接所有的chunk，并转换成字符串
        let html = Buffer.concat(chunks).toString('utf-8')
        let $ = cheerio.load(html)
        // 方法1：使用each
        //let pics = []
        //$('.maincon .main_pic > img').each((index, item) => {
        //pics.push(HOST + $(item).attr('src'))
        //})

        // 方法2：使用js5的Array map方法
        let pics = Array.prototype.map.call($('.maincon .main_pic > img'), item => HOST + encodeURI($(item).attr('src')))

        // 方法3：使用 cheerio 的map
        //let pics = $('.maincon .main_pic > img').map((idx, item) => {
        //HOST + $(item).attr('src')
        //})

        Promise.all(pics.map(x => download(x, "pics"))).then(() => {
            console.log("图片下载成功")
        })
    })
})

// 将请求发出去
req.end()
