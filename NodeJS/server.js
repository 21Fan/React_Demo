const http=require('http');
const urlLib=require('url');

var server = http.createServer(function(req,res){
    //console.log('有人来了');
    
    var obj=urlLib.parse(req.url,true);
    // console.log(obj);
    var url=obj.pathname;
    var GET=obj.query;
    console.log(url,GET);

    res.write('成功');
    res.end();
});
//监听
//端口
server.listen(8080);