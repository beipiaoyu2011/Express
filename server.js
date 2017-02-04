
var express = require('express');
var app = express();

// app.use('/demo',express.static('public'));//demo 虚拟路径
app.use('/',express.static('public'));//demo 虚拟路径
// 对网站首页的访问返回 "Hello World!" 字样
app.get('/',function(req, res){
    res.send('Hello world');
});
// 网站首页接受 POST 请求
app.post('/',function(req,res){
    res.send('Got a POST request');
});
// /user 节点接受 PUT 请求
app.put('/user', function(req, res){
    res.send('Got a PUT request at /user');
});
// /user 节点接受 DELETE 请求
app.delete('/user', function(req, res){
    res.send('Got a Delete request at /user');
});

var server = app.listen(8000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('server started at http://localhost:'+ port);
});
