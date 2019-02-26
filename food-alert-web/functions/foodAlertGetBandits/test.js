require('babel-register');
var { foodAlertGetBandits } = require('./index');

let status = () => ({
    send: console.log
});

foodAlertGetBandits({
    query: {
    }
}, {
    set: () => {},
    status
});
