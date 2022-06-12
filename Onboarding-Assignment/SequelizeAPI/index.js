const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const fileStore = require('session-file-store')(session);

const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = express();
app.use(morgan('dev'));
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: new fileStore()
}));

//auth session
function auth(req,res,next) {
    console.log(req.headers);

    if(!req.session.user) {
        var authHeader = req.headers.authorization;

        if(!authHeader){
            const err = new Error ('You are not authenticated');
            err.status=401;
            return next(err);
        }

        var auth= new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
        var username= auth[0];
        var password = auth[1];

        if(username==='admin' && password==='Medi@321') {
            req.session.user = 'admin';
            next();
        }
        else {
            const err = new Error ('You are not authenticated!');
            err.status=401;
            return next(err);
        }
    }
    else {
        if(req.session.user === 'admin') {
            next();
        }
        else {
            const err = new Error ('You are not authenticated!');
            err.status=401;
            return next(err);
        }
    }
    
    
    
}



app.use(auth);

//DataBase Connection
require('./src/models/connection');
const patientModel = require('./src/models/patientModel');
patientModel.sync();

const patientRouter = require('./src/routes/patientRouter');
app.use('/',patientRouter);

app.listen(port,hostname, ()=> {
    console.log('Server is running');
});