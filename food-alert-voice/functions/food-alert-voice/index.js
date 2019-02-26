'use strict';
const http = require('https');
const host = 'https://us-central1-slalom-chicago-sandbox.cloudfunctions.net'

exports.getMetricsWebhook = (req, res) => {
  // Get the (optional) poptart flavor and time from the request
  let flavor = ''; // flavor is an optional param
  if (req.body.result.parameters['flavor']) {
    flavor = req.body.result.parameters['flavor'];
    console.log('Flavor: ' + flavor);
  }
  let time = ''; // time is optional param
  if (req.body.result.parameters['time']) {
    time = req.body.result.parameters['time'];
    console.log('Time: ' + time);
  }

  // Call the foodAlert getMetrics API
  callGetMetricsAPI(flavor,time).then((output) => {
    // Return the results of the getMetrics API to Dialogflow
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
  }).catch((error) => {
    // If there is an error let the user know
    console.log(error);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
  }); 
};

function callGetMetricsAPI (flavor, time) {
  return new Promise((resolve, reject) => {
  	// interpolate poptart flavor
  	let queryString = ''

	if (flavor === 'Blueberry') {
  		queryString = '?kind=pop-tarts-blueberry'
  	} else if (flavor === 'Strawberry') {
  		queryString = '?kind=pop-tarts-strawberry'
  	} else if (flavor === 'Chocolate') {
  		queryString = '?kind=pop-tarts-chocolate'
  	}

    // Create the path for the HTTP request to get the poptart metrics
    let url = host + '/foodAlertGetMetrics' + queryString;
    console.log('API Request: ' + url);
    // Make the HTTP request to get the metrics
    http.get(url, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let response = JSON.parse(body);
        console.log('Response: ' + response);
        let currentState;
        if (response.length) {
          currentState = response[0].weight;  
        }
        let output;

        if (currentState = null) {
          output = `Time for a walk, let us know if there are any :) !!`;
          console.log(output);
        } else if (currentState < 50) {
        	output = `Current ${flavor} poptart situation is DIRE, we have basically none left!!`;
        	console.log(output);
        } else if (currentState > 1500) {
          output = `Current ${flavor} poptart situation is OVERFLOWING, please go eat some now!!`;
          console.log(output);
        }
          else {
        	output = `Current ${flavor} poptart situation is STABLE, we have some for everyone!!`;
        	console.log(output);
        }
        // Resolve the promise with the output text
        console.log(output);
        resolve(output);
      });
      res.on('error', (error) => {
        reject(error);
      });
  });
  });
}