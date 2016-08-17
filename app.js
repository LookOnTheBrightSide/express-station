'use strict'
var express = require('express');
var app = express();
var results = require('./results.json')

app.set('view engine', 'jade')
app.set('views',__dirname + '/views' )

app.get('/', function(req, res) {
    res.render('index')
});

app.get('/api', function(req, res) {
    res.send(results);
});

app.get('/contact',function(req,res){
    res.sendFile("readme.md", {"root": __dirname});
})

app.get('/api/:country', function(req, res) {
    var country = req.params.country;
    var data = [];
    for (var i = 0; i < results.length; i++) {
        if (results[i].hasOwnProperty("country")) {
            if (results[i].country.toLowerCase() === country.toLowerCase()) {
            		data.push(results[i]);
            }
        }
    }
    res.send(data);
});
app.get('/api/:country/:city', function(req, res) {
    var country = req.params.country;
    var city = req.params.city;
    var data = [];
    for (var i = 0; i < results.length; i++) {
        if (results[i].hasOwnProperty("country")) {
            if ((results[i].country.toLowerCase() === country.toLowerCase()) && (results[i].city.toLowerCase() === city.toLowerCase()))  {
            		data.push(results[i]);
            }
        }
    }
    res.send(data);
});


app.listen(3000, function() {
    console.log('http://localhost:3000');
});