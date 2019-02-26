require('babel-register');

const { getFoodMetrics } = require('./index');

getFoodMetrics({}, console.log);
