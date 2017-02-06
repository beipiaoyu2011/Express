var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  // res.send('Birds home page');
  res.render('index', {title: 'Hey', message: 'hello there'});
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('About birds');
});
//中间件
router.get('/about/:id',function(req, res, next){
    console.log('ID:'+req.params.id);
    if(req.params.id == 0){
        next('route');//跳出中间件
    }else{
        next();
    }
},function(req, res ,next){
    //TO DO response
    // res.render('special');
    res.send(req.originalUrl);
});

module.exports = router;
