var express = require('express')
var app = express()
var fs = require('fs')
var fetch = require('node-fetch')
 
app.get('/', function (req, res) {
var RaspiCam = require("raspicam");
var output = __dirname + "/piCapture.jpg"
var camera = new RaspiCam({
  mode:'photo',
  encoding: 'jpg',
  timeout: 1,
  output: output
});
camera.start();
camera.on("read", function () {
  camera.stop();
  var img = fs.readFileSync(output);
  fetch('https://us-central1-slalom-chicago-sandbox.cloudfunctions.net/foodAlertPredictImage', {
	method: 'POST',
	body: img.toString('base64'),
headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
  }).then(function () {
    res.send('OK');
  });
});
});
 
app.listen(3000)
