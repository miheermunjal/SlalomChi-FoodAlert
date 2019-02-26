const Datastore = require('@google-cloud/datastore');
const projectId = 'slalom-chicago-sandbox';
const namespace = 'food-alert';

// Instantiates a client
const datastore = Datastore({
    projectId,
    namespace
});

function getBandits(options, cb) {
    const kind = options.kind;
    const limit = options.latest ? 1 : 20;

    const query = datastore.createQuery(kind)
        .order('timestamp', {
            descending: true
        })
        .limit(limit);

    datastore.runQuery(query)
        .then((results) => cb(null, results))
        .catch((err) => cb(err, null))
}

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.foodAlertGetBandits = function foodAlertGetMetrics(req, res) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');

    const options = {
        kind: 'bandit',
        latest: req.query.latest
    };

    getBandits(options, (err, response) => {
        if (err) return res.status(400).send(err);

        if (!response.length) return res.status(200).send([]);

        if (response.length) {
            return res.status(200).send(response[0]);
        }
    });
};
