var express = require("express");
var Search = require("bing.search");
var app = express();
var search = new Search('wzPhvJlN7jnEVXF+Nf5RPwFx6nydyOzIcqlOQCBJlHM');
app.set('port', process.env.PORT || 3000);
var testObj = {};
app.get('/', function(req, res){
    res.status(200);
   res.send('<h1>Hello, World</h1>'); 
});


app.get('/search*', function(req, res) {
   res.status(200); 
   var srch = req.url.replace(/[\/search\/%20]/g, ' ');
   
   search.images(srch, {top:1}, function(err, data){
      if(err)console.error(err);
      console.log(data);
      res.send(data);
   });
   
});

app.get('/recent', function(req, res) {
    res.status(200);
    res.send('<h1>Recent searches go here</h1>');
});

app.listen(app.get('port'), function(){
    console.log('Listening on port ' + app.get('port'));
});