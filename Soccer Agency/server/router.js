const path = require("path");


var router = function(app) {
    app.get('/', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/SoccerHTML.html"));
    });

    app.get('/home', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/SoccerHTML.html"));
    });

    app.get('/AgentsListHTML', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/AgentsListHTML.html"));
    });

    app.get('/SignUpScreen', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/SignUpScreen.html"));
    });

    app.get('/PlayersListHTML', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/PlayersListHTML.html"));
    });

    app.get('/shortlist', function (req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/shortlist.html"));
    });
};

module.exports = router;