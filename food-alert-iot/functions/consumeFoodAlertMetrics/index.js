const Datastore = require('@google-cloud/datastore');
const projectId = 'slalom-chicago-sandbox';
const namespace = 'food-alert';

exports.consumeFoodAlertMetrics = function (event, callback) {
    const pubsubMessage = event.data;
    const data = pubsubMessage.data ? Buffer.from(pubsubMessage.data, 'base64').toString() : null;
    // const weight = pubsubMessage.data;

    if (data) {
        const { weight, kind } = JSON.parse(data);
        const datastore = Datastore({projectId, namespace});

        const key = datastore.key([kind]);

        const entity = {
            key,
            data: {
                weight: parseInt(weight),
                timestamp: new Date()
            }
        };

        datastore.save(entity).then(callback).catch(callback);
    } else {
        callback();
    }
};
