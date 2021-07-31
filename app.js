require('dotenv').config();
let path = require("path");
let express = require("express");
let connection = require('./config/db');
const assets = path.join(__dirname, 'assets');

// access express 
let app = express();
let port = process.env.PORT || 2200;

app.use(express.static(assets));

// access database connection and api route
const db = connection;
const route = { api: require('./routes/api') }

// handle requests to api route and docs
app.use('/api/v1', route.api);

app.get('/:file', (req, res)=>{
    res.sendFile(path.join(assets, `/docs/${req.params.file}`));
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(assets, '/docs/index.html'));
})


// listen for incoming requests on port 
app.listen(port, ()=>{
    `running on port ${port}`
})
