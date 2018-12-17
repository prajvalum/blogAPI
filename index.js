const appConfig = require("./config/appConfig")
const fs = require('fs')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

//app.use(bodyParser.json);
//app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())


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




app.listen(appConfig.port, () => {
	console.log(`Example app listening on port ${appConfig.port}`);
	let db = mongoose.connect(appConfig.db.uri, {useNewUrlParser: true});
});

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