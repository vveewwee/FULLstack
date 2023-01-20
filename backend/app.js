const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

mongoose.connect('CONNECTION')
    .then(()=>{
        console.log('Successfully connected to Mongodb Atlas');})
    .catch((error)=>{
        console.log('Unable to connect to MongoDb Atlas!');
        console.error(error);
    })
//all app routes where moved to routes/stuff.js and imported here
/*
//a piece of middleware, needs next for the following middleware to work correctly
app.use((req, res, next) => {
    console.log("Request received");
    next();
});

//a piece of middleware
app.use((req, res, next) => {
    res.status(201);
    next();
});

//a piece of middleware
app.use((req, res, next) => {
    res.json({ message: 'The request was successfull'});
});
*/

//it intercepts every request that has an json content type,
//it takes teh request body and it will put at the request as the body property 
//by making it easy to acces the data in the request body
app.use(express.json());


//need to create an extra middleware, which will add some headers to the response object
//setHeader method
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;