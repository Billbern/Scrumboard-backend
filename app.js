require('dotenv').config();
const path = require("path");
let express = require("express");
const cookieParser = require("cookie-parser");
const corsWare = require('./config/cors');


let connection = require('./config/db');
const assets = path.join(__dirname, 'assets');


// access express 
let app = express();
let port = process.env.PORT || 2200;

// set Cookies, static folder and add Access-Control-Allow-Origin requests header
app.use(cookieParser());
app.use(express.static(assets));
app.use(corsWare);

// access database connection and api route
const db = connection;
const route = {
    user: require('./routes/user'),
    auth: require('./routes/auth'),
    multis: require('./routes/multidata'),
    singles: require('./routes/singledata')
}


// handle requests to api route and docs
app.options('*', corsWare);
app.use('/api/v1', route.auth);
app.use('/api/v1', route.user);
app.use('/api/v1', route.singles);
app.use('/api/v1', route.multis);



app.get('/:file', (req, res) => {
    res.sendFile(path.join(assets, `/docs/${req.params.file}`));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(assets, '/docs/index.html'));
})


// listen for incoming requests on port 
app.listen(port, () => {
    `running on port ${port}`
})