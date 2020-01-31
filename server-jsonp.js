/* 初始化 */

var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method


    /* 服务器启动 */

    console.log('总路径为:' + pathWithQuery)


    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('./index.html'))
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(`h1{color: red}`)
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('./main-jsonp.js'))
        response.end()
    } else if (path === '/friends') {
        // referer 检查
        if (request.headers.referer.indexOf('http://localhost:9001') === 0) {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/json;charset=utf-8')
            let friends = fs.readFileSync('./friends.js')
            let jsonp = fs.readFileSync('./friends.json').toString()
            friends = friends.toString().replace('`{{jsonp}}`',jsonp).replace('{{random}}',query.callback)
            response.write(friends)
            response.end()          
        } else {
            response.statusCode = 404
            response.end()          
        }
    }
    else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`页面不存在`)
        response.end()
    }

})

/* 监听端口 */

server.listen(port)
console.log('监听端口' + port + '成功')
console.log('本地地址为 http://localhost:' + port)