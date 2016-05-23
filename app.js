var express = require("express");
var Search = require("bing.search");
var app = express();
var mongoose = require('mongoose');
var Recent = require("./SearchSchema");
var search = new Search('wzPhvJlN7jnEVXF+Nf5RPwFx6nydyOzIcqlOQCBJlHM');
app.set('port', process.env.PORT || 3000);

var db = 'mongodb://heroku_z5x24bg8:86g862ksdl6agi5mncge3352dt@ds011863.mlab.com:11863/heroku_z5x24bg8';

var testObj = [];
var testArr = [];
mongoose.connect(db, function(err, db){
    if(err)console.error(err);
    
    console.log("Successfully connected to the db");
});

app.get('/', function(req, res){
    res.status(200);
    var html = '';
    html = '<h1>Hello, World</h1>';
    html += '<p>Please enter in a search query string to return image results</p>';
    html += '<p>ex https://im-src.herokuapp.com/search/derrick rose?offset=5</p>';
    html += '<p>offset shows specified amount of results</p>';
    html += '<p>https://im-src.herokuapp.com/recent shows recent searches</p>';
   res.send(html); 
});

function imgQuery(url, alttext, thumbnail)
{
    this.url = url;
    this.alttext = alttext;
    this.thumbnail;
}

app.get('/search*', function(req, res) {
   res.status(200); 
   global.BroadCnt = 0;
   var srch = req.url.split('/')[2].split('?')[0].replace(/%20/g, ' ');//.replace(/[\/search\/%20]/g, ' ');
   //var offset = req.url.split('?');
   var offset = req.url.split('?')[1].split('=')[1].replace(/\&/g, '');
   console.log(srch);
   search.images(srch, {top:offset}, function(err, data){
       //console.log(global.BroadCnt);
      if(err)console.error(err);
      var cnt = 0;
      //console.log(srch);
      for(var i = 0; i < offset; i++)
      {
          testObj.push(new imgQuery(data[i]['url'], data[i]['title'], data[i]['thumbnail']['url'] ));
          cnt++;
      }
          

for(var j = 0; j <testObj.length; j++)
{
   testArr.push({url : testObj[j].url, alttext : testObj[j].alttext, 
thumbnail : testObj[j].thumbnail});
}

Recent.create(testArr, function(err, data){//this adds an array into db
    if(err)console.error(err);
});
res.send(testObj);
   });
   
   testObj.length = 0;
});

app.get('/recent', function(req, res) {
    res.status(200);
    //res.send('<h1>Recent Searches</h1');
    Recent.find({})
    .exec(function(err, recents){
       if(err)console.error(err);
       //console.log(recents);
       
       res.json(recents);
    });
    
    //res.send(    );
});

app.listen(app.get('port'), function(){
    console.log('Listening on port ' + app.get('port'));
});