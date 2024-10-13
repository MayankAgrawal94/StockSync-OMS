const { BasicConfig } = require('../config/env.constant')
const apiKey = BasicConfig.apiKey;

const verifyApiKey = (req, res, next) => {
    const requestKey = req.headers['x-api-key'];
    if (requestKey === apiKey) {
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
};

module.exports = verifyApiKey;
