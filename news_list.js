const http = require('http')

const HOST = 'http://www.itcast.cn'
const URL = HOST + '/news/json/f1f5ccee-1158-49a6-b7c4-f0bf40d5161a.json';

let req = http.request(URL, { method: 'get' }, res => {
    let chunks = [];
    res.on('data', chunk => {
        chunks.push(chunk)
    })
    res.on('end', () => {
        let jsonStr = Buffer.concat(chunks).toString('utf-8')
        let json = JSON.parse(jsonStr)
        console.log(json.data)
    })
})

req.end()
