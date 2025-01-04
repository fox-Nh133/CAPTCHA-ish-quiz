const functions = require('@google-cloud/functions-framework');

functions.http('validateAnswer', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    let predefineSet;

    predefineSet = new Set(['image1', 'image2', 'image3']);
    const receivedSet = new Set (req.body.items);

    let isValid = true;

    if (receivedSet.size === predefineSet.size) {
        for (const item of receivedSet) {
            if (!predefineSet.has(item)){
                isValid = false;
                break;
            }
        }   
    } else {
        isValid = false
    }

    if (isValid) {
        res.status(200).send('True');
    } else {
        res.status(400).send('False');
    }
});
