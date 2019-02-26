const API_URL = 'https://us-central1-slalom-chicago-sandbox.cloudfunctions.net/uploadImage?label=';

export function upload(image, label, setMessage) {
    const content = image.split(',').pop();
    const body = content;

    const request = {
        method: 'POST',
        mode: 'cors',
        body: body
    };

    return fetch(API_URL + label, request)
            .then(response => response.json())
            .then((response) => {
                setMessage(null, true);
            })
            .catch(() => setMessage(true, false));
}