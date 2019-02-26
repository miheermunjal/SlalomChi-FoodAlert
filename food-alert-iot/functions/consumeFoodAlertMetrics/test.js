require('babel-register');
var { consumeFoodAlertMetrics } = require('./index');

consumeFoodAlertMetrics({
        "data": {
            "data": "3123123"
        }
    }, console.log);
