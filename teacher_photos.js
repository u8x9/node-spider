// 引入http模块
const http = require('http')

// 创建请求对象(此时未发送请求)
let req = http.request('http://web.itheima.com/teacher.html', res => {
    // 异步响应

    let chunks = []

    // 监听data事件，获取传递过来的数据片段
    res.on('data', chunk => {
        chunks.push(chunk)
    })

    // 监听end事件，数据获取完毕时触发
    res.on('end', () => {
        // 拼接所有的chunk，并转换成字符串
        console.log(Buffer.concat(chunks).toString())
    })
})

// 将请求发出去
req.end()
