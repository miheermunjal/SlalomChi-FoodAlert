const Storage = require('@google-cloud/storage');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const bucket = 'slalom-employees-facial-recognition';

const tmp = '/tmp/';

const storage = new Storage();

function updateCSVFile(srcFilename, label, callback) {
    let csvFile = 'train_set.csv';
    const destination = 'img/' + csvFile;

    const options = {
        destination: tmp + csvFile,
    };

    storage
        .bucket(bucket)
        .file('img/' + csvFile)
        .download(options)
        .then(() => {
            let data = fs.readFileSync(tmp + csvFile);
            data += `gs://${bucket}/${srcFilename},${label}\n`;
            fs.writeFileSync(tmp + csvFile, data);
            storage
                .bucket(bucket)
                .upload(tmp + csvFile, { destination })
                .then(callback)
                .catch(callback);
        })
        .catch(err => {
            console.error('ERROR:', err);
            callback();
        });
}

exports.uploadImage = function (req, res) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');

    const imageId = uuidv1() + '.jpg';

    fs.writeFileSync(tmp + imageId,  new Buffer(req.body, 'base64').toString('binary'), 'binary');

    const destination = 'img/' + imageId;
    storage
        .bucket(bucket)
        .upload(tmp + imageId, { destination })
        .then((response) => {
            updateCSVFile(destination, req.query.label, () => {
                res.status(200).send(response)
            });
        })
        .catch((error) => res.status(400).send(error));
};
