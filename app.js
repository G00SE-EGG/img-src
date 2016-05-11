var express = require("express");
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.status(200);
   res.send('<h1>Hello, World</h1>'); 
});


app.get('/api', function(req, res) {
   res.status(200); 
   res.send('<h1>API</h1>');
});

app.get('/recent', function(req, res) {
    res.status(200);
    res.send('<h1>Recent searches go here</h1>');
});

app.listen(app.get('port'), function(){
    console.log('Listening on port ' + app.get('port'));
});