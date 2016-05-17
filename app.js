var express = require("express");
var Search = require("bing.search");
var app = express();
var search = new Search('wzPhvJlN7jnEVXF+Nf5RPwFx6nydyOzIcqlOQCBJlHM');
app.set('port', process.env.PORT || 3000);
var testObj = [];
app.get('/', function(req, res){
    res.status(200);
   res.send('<h1>Hello, World</h1>'); 
});

function imgQuery(url, alttext, thumbnail)
{
    this.url = url;
    this.alttext = alttext;
    this.thumbnail;
}

app.get('/search*', function(req, res) {
   res.status(200); 
   var srch = req.url.split('/')[2].split('?')[0].replace(/%20/g, ' ');//.replace(/[\/search\/%20]/g, ' ');
   //var offset = req.url.split('?');
   var offset = req.url.split('?')[1].split('=')[1].replace(/\&/g, '');
   console.log(srch);
   search.images(srch, {top:offset}, function(err, data){
      if(err)console.error(err);
      
      console.log(srch);
      for(var i = 0; i < offset; i++)
      {
          testObj.push(new imgQuery(data[i]['url'], data[i]['title'], data[i]['thumbnail']['url'] ));
      }
      //for(var j = 0; j < offset; j++)
      //{
          res.send(testObj);
      //}
      srch = "";
      for(var j = 0; j < offset; j++)
      {
          testObj[j].url = "";
          testObj[j].alttext = "";
          testObj[j].thumbnail = "";
      }
   });
   
   
});

app.get('/recent', function(req, res) {
    res.status(200);
    res.send('<h1>Recent searches go here</h1>');
});

app.listen(app.get('port'), function(){
    console.log('Listening on port ' + app.get('port'));
});