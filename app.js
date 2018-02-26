var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use('/assets',express.static('assets'));
app.use('/app',express.static('app'));
app.use('/scripts',express.static('node_modules'));


app.get('/', function (req, res) {
    res.render('index');
});

app.listen(3002, function () {
  console.log('Reactive Santa listening on port 3002!');
});