const functions = require('@google-cloud/functions-framework');

functions.http('validateAnswer', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    const question = req.get('Question');
    let predefineSet;

    prefineSet = new Set(['image1', 'image2', 'image3']);
    const receivedSet = new Set (req.body.items);

    let isValid = true;

    if (receivedSet.size === predefineSet.size) {
        for (const item of receivedSet) {
            if (!predefineSet.has(item)){
                isValid = false;
                break;
            }
        }   
    }

    if (isValid) {
        res.status(200).send('True');
    } else {
        res.status(400).send('False');
    }
});
