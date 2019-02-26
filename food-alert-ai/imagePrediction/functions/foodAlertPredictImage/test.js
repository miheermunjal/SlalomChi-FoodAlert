require('babel-register');
var { foodAlertPredictImage } = require('./index');
var { readFileSync } = require('fs');

let body = readFileSync('./image');

let status = () => ({
    send: console.log
});

foodAlertPredictImage({
    query: {
    },
    body
}, {
    set: () => {},
    status
});
