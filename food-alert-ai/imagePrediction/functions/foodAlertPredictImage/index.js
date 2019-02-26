const Storage = require('@google-cloud/storage');
const Datastore = require('@google-cloud/datastore');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const projectId = 'slalom-chicago-sandbox';
const namespace = 'food-alert';
const { exec } = require('child_process');
const bucket = 'food-alert-data';
const MODEL_NAME = 'slalom_employees';

const tmp = '/tmp/';

const dict = [
    'empty',
    'panosp',
    'miheerm',
    'stephenw'
];

const storage = new Storage();

function getPrediction(image, callback) {
    const request = {"image_bytes": {"b64": image.toString('base64') }, "key": "0"};

    fs.writeFileSync(tmp + 'request.json', JSON.stringify(request));

    const command = `~/google-cloud-sdk/bin/gcloud ml-engine predict --model ${MODEL_NAME} --json-instances ${tmp}request.json`;

    exec(command, (err, data) => {
        if (err) {
            callback();
        } else {
            console.log(data);
            data = data.replace(/\s+/gi, '|').split('|');
            if (data.length > 5) {
                try {
                    callback(dict[parseInt(data[4])]);
                } catch (e) {
                    callback();
                }
            } else {
                callback();
            }
        }
    });
}

function saveInDatastore(srcFilename, label, callback) {
    const datastore = Datastore({ projectId, namespace });

    const kind = 'bandit';
    const key = datastore.key([kind]);

    const entity = {
        key,
        data: {
            image: `https://storage.googleapis.com/${bucket}/${srcFilename}`,
            timestamp: new Date(),
            label
        }
    };

    datastore.save(entity).then(callback).catch(callback);
}
exports.foodAlertPredictImage = function (req, res) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');

    const imageId = uuidv1() + '.jpg';

    const image = new Buffer(req.body, 'base64');
    fs.writeFileSync(tmp + imageId,  image.toString('binary'), 'binary');

    const destination = 'img/' + imageId;
    storage
        .bucket(bucket)
        .upload(tmp + imageId, { destination })
        .then((response) => {
            getPrediction(image, (label) => {
                saveInDatastore(destination, label, () => {
                    res.status(200).send(response)
                });
            });
        })
        .catch((error) => res.status(400).send(error));
};
