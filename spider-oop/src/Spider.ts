import SpiderOptions from './interfaces/SpiderOptions'
const http = require('http')

export default class Spider {
    options: SpiderOptions
    constructor(options: SpiderOptions = { url: '', method: 'get' }) {
        this.options = options
    }
    start() {
        let req = http.request(this.options.url, {
            headers: this.options.headers,
            method: this.options.method,
        }, (res: any) => {
            let chunks: any[] = []
            res.on('data', (c: any) => chunks.push(c))
            res.on('end', () => {
                let result = Buffer.concat(chunks).toString('utf-8')
                console.log(result)
            })
        })
        req.end()
    }
}
