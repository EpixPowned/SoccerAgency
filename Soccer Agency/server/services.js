const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Winners12',
    database: 'socceragencydb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

var services = function (app) {
    app.post('/create-user', function (req, res) {
        var data = {
            user_username: req.body.username,
            user_password: req.body.password,
            user_email: req.body.emailaddress

        }

        console.log(JSON.stringify(data));

        connection.query("INSERT INTO user SET ?", data, function (err, results) {
            if (err) {
                return res.status(201).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
            }
        })
    });

    app.get('/login', function (req, res) {
        
        console.log("Username " + req.query.username);
        connection.query("SELECT * FROM user WHERE user_username = ? AND user_password = ?", [req.query.username, req.query.password], function (err, results) {
            console.log(JSON.stringify(results));
                if (err) {
                    return res.status(201).send(JSON.stringify({ msg: "Error: " + err }));
                } if (results.length > 0) {
                    return res.status(200).send(JSON.stringify({ msg: "SUCCESS", user_data: results }));
                } else {
                    return res.status(200).send(JSON.stringify({msg: "Incorrect Username or Password"}));
                    
                }
            }) 
    });


    app.get('/getAgents', function (req, res) { 
        connection.query("SELECT a.agent_id, agent_first_name, agent_last_name, agent_email, agent_phone, player_first_name, player_last_name " 
        + "FROM agent a JOIN player p ON p.agent_id = a.agent_id ORDER BY agent_id", function (err, results) {
           if (err) {
               return res.status(201).send(JSON.stringify({ msg: "Error: " + err }));
            }
            if (results.length > 0) {
                return res.status(200).send(JSON.stringify({ msg: "SUCCESS", agent_data: results }));
            }
        })
    })

    app.get('/getPlayers', function (req, res) {
        connection.query("SELECT * FROM player", function (err, results) {
            if (err) {
                return res.status(201).send(JSON.stringify({ msg: "Error: " + err }));
            }
            if (results.length > 0) {
                return res.status(200).send(JSON.stringify({ msg: "SUCCESS", player_data: results }));
            }
        })
    })

    app.post('/addToShortlist', function (req, res) {
        var data = {
            user_id: req.body.user_id,
            player_id: req.body.player_id
        }
            connection.query("INSERT INTO shortlist SET ?", data , function (err, results) {
                if (err) {
                    return res.status(201).send(JSON.stringify({ msg: "Error: " + err }));
                }
                if (results.length > 0) {
                    return res.status(200).send(JSON.stringify({ msg: "SUCCESS"}));
                }
            })
    })

    app.delete('/removeFromShortlist', function (req, res) {
        var data = {
            user_id: req.body.user_id,
            player_id: req.body.player_id
        }
        connection.query("DELETE FROM shortlist WHERE user_id = ? AND player_id = ?", [req.body.user_id, req.body.player_id] , function (err, results) {
            if (err) {
                return res.status(201).send(JSON.stringify({ msg: "Error: " + err }));
            }
            if (results.length > 0) {
                return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
            }
        })
    })

    app.get('/getShortlist', function (req, res) {
        var data = {
            user_id: req.query.user_id
        }
        connection.query("SELECT * FROM player NATURAL JOIN shortlist WHERE user_id = ?", req.query.user_id, function (err, results) {
            if (err) {
                return res.status(201).send(JSON.stringify({ msg: "Error: " + err }));
            }
            if (results.length > 0) {
                return res.status(200).send(JSON.stringify({ msg: "SUCCESS", player_data: results }));
            }
        })
    })
}
module.exports = services;