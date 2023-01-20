// console.log("This is a node app!");
//$> node server
//once nodemon is install, we use it to constantly have a server that restarts when we change the code
//$> nodemon server
//in order to make this an http server
//import a node package by creating a constant called http, which requires an http package, default node package, 

const http = require('http');
//create a server by calling the createServer method on the http object
//this methods takes a function as an argument, this function is executed every time the server receives a call
//node will injected with the request (req) and response (res) objects 
//the end method, sends back the object to whoever is making the http call 

//what follows is the hardcoded function for the listener
// const server = http.createServer((req, res) => {
//     res.end('This is my server response');
// });
//is where we need to import the app
const app = require('./app');


//returns a valid port, whether it is provided as a number or a string
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0){
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

// checks for various errors and handles them appropriately — it is then registered to the server
const errorHandler = error => {
    if (error.syscall !== 'listen'){
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    switch (error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1); 
            break;
        default:
            throw error;
    }
};

 
const server = http.createServer(app);

server.on('error', errorHandler);
//A "listening" event listener is also registered, logging the port or named pipe on which the server is running to the console.
server.on('listening', ()=>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    console.log('Listening on ' + bind);
});

//the server needs to listen to a certain port 
//will be using port 3000 for development 
//use the listen method on server object and pass teh port we want ot listen to
//when deploying a node it wont always be listening to port 3000
//so we need to receive the port that is going to listen to from the application
//process.env.Port is dynamically injected by node, so if the port received as variable OR 3000

server.listen(port);