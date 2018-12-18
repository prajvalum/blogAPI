const appConfig = require("./config/appConfig"); 
const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const globalErrorMiddleware = require('./middlewares/appErrorHandler');
const globalRouteMiddleware = require('./middlewares/routeLogger');
const http = require('http')
var helmet = require('helmet')
const logger = require('./libs/loggerLib');

app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

app.use(globalErrorMiddleware.globalErrorHandler);
app.use(globalRouteMiddleware.logIp);
//app.use(bodyParser.json);
//app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(helmet())

let modelPath = './models'
fs.readdirSync(modelPath).forEach( function (file) {
	if(~file.indexOf(".js")){
		console.log(modelPath + "/" + file);
		require(modelPath + "/" + file);
	}
});

let routePath = './routes'
fs.readdirSync(routePath).forEach( function (file) {
	if(~file.indexOf(".js")){
		console.log(routePath + "/" + file);
		let route = require(routePath + "/" + file);
		route.setRouter(app);
	}
});

app.use(globalErrorMiddleware.globalNotFoundError);

const server = http.createServer(app)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
	if (error.syscall !== 'listen') {
		logger.error(error.code + " not equal listen ", "serverOnErrorHandler", 10)
		throw error
	}
	switch(error.code) {
		case 'EACCESS':
			logger.error(error.code + ":elavated privileged required", "serverOnErrorHandler", 10)
			process.exit(1)
			break
		case 'EADDRINUSE':
			logger.error(error.code + " port already in use ", "serverOnErrorHandler", 10)
			process.exit(1)
			break
		default:
			logger.error(error.code + " some unknown erorr occured ", "serverOnErrorHandler", 10)
			throw error
	}
}

function onListening() {
	var addr = server.address()
	var bind = typeof addr == 'string'
		?'pipe' + addr
		:'port' + addr.port;
	logger.info('server listening on port ' + addr.port, "serveronListeningHandler", 10);
	let db = mongoose.connect(appConfig.db.uri, {useNewUrlParser: true});
}

process.on('unhandledRejection', (reason, p) => {
	console.log('unHandleRejection at: promise', p, 'reason:', reason);
})

// app.listen(appConfig.port, () => {
// 	console.log(`Example app listening on port ${appConfig.port}`);
// });

mongoose.connection.on('error', function (err)
{
	console.log('database connection error');
	console.log(err);
});

mongoose.connection.on('open', function(err)
{
	if(err)
	{
		console.log('database connection success');
		console.log(err);
	}
	else{
		console.log('database connection success');
	}
	
});