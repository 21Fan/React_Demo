const http=require('http');
const urlLib=require('url');

var server = http.createServer(function(req,res){
    //console.log('有人来了');
    
    var obj=urlLib.parse(req.url,true);
    // console.log(obj);
    var url=obj.pathname;
    var GET=obj.query;
    console.log(url,GET);

    
    // switch(req.url){
    //     case'/1.html':
    //         res.write("111111");
    //         break;
    //     case'/2.html':
    //         res.write("222222");
    //         break;
    //     default:
    //         res.write('404');
    //         break;

    // }
    res.write('成功');
    res.end();
});
//监听
//端口
server.listen(8080);