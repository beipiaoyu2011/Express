
var express = require('express');
var app = express();
var birds = require('./birds');
var cookieParser = require('cookie-parser');
//定义错误中间件
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
};
//logErrors 将请求和错误信息写入标准错误输出、日志或类似服务
function logErrors(err, req, res, next){
    console.log(err.stack);
    next(err);
}
//clientErrorHandler 的定义如下（注意这里将错误直接传给了 next）
function clientErrorHandler(err, req, res, next){
    if(req.xhr){
        res.status(500).send({error: 'something blew up'});
    }else {
        next(err);
    }
}
//errorHandler 能捕获所有错误
function errorHandler(err, req, res, next){
    res.status(500);
    res.render('error',{error: err});
}

//设置渲染jade文件
app.set('view engine', 'jade');
// 加载用于解析 cookie 的中间件
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use('/', birds, express.static('public', options));
// app.use('/demo',express.static('public'));//demo 虚拟路径
// app.use('/');//demo 虚拟路径
app.use(function(err, req, res, next){
    res.status(400).send("sorry can't find it");
});
// 对网站首页的访问返回 "Hello World!" 字样
// app.get('/',function(req, res){
//     res.send('Hello world');
// });
// // 网站首页接受 POST 请求
// app.post('/',function(req,res){
//     res.send('Got a POST request');
// });
// // /user 节点接受 PUT 请求
// app.put('/user', function(req, res){
//     res.send('Got a PUT request at /user');
// });
// // /user 节点接受 DELETE 请求
// app.delete('/user', function(req, res){
//     res.send('Got a Delete request at /user');
// });
// app.all('/',function(req, res, next){
//     res.send('66');
//     next();
// });



var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
};

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
};

var cb2 = function (req, res) {
  res.send('Hello from C!');
  // res.download('/dd.pdf');
};

app.get('/example/c', [cb0, cb1, cb2]);




var server = app.listen(8000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('server started at http://localhost:'+ port);
});
