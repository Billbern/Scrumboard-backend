const cors = require('cors');

// process.env.FRONT_ORIGIN
const corsOptions = {
    origin: process.env.FRONT_ORIGIN,
    credentials: true, 
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With']
}

module.exports = cors(corsOptions);