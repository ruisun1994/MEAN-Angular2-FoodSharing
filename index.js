const express = require('express');
const app = express();
const router =express.Router();
const config = require('./config/database');
const mongoose = require('mongoose');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could NOT connect to the database: ', err);
    }else{
        console.log('Connected to the database: ' + config.db)
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Provide static directory for frontend
app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);

//Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

//Start Server: Listen on port 8080
app.listen(8080, () =>{
    console.log('Listening on port 8080');
});
