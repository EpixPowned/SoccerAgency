const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(cors());

app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

var server;

var port = 3000;

var router = require('./router.js');
router(app);

var services = require('./services.js');
services(app);

server = app.listen(port, function(err) {
    if(err) throw err;

    console.log("Listening on port: " + port);
})