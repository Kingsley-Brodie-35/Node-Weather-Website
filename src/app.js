const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { get } = require('http');
const app = express();
const weatherStack = require('./utils/weatherStack');
require('dotenv').config();
const port = process.env.PORT || 3000;
//setup filepaths to config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const viewsHelpPath = path.join(__dirname, '../templates/views/help');
const errorPath = path.join(__dirname, '../templates/views/fourOFour');
const partialsPath = path.join(__dirname, '../templates/partials');
//setup the handlebars engine and point it to the right directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//serve static files within public directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render(viewsPath, {
		title: 'Weather App',
		name: 'Kingsley Brodie'
	});
});

app.get('/help', (req, res) => {
	res.render(viewsHelpPath, {
		title: 'Help',
		name: 'Kingsley Brodie'
	});
});
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		res.send({
			error: 'please provide a location query'
		});
	} else {
		const request = req.query.address;
		weatherStack(request, (error, response) => {
			if (error) {
				res.send({ error: error });
			} else {
				res.send({
					response
				});
			}
		});
	}
});
app.get('/help/*', (req, res) => {
	res.render(errorPath, {
		title: '404 file not found',
		error: 'help documentation not found'
	});
});
app.get('*', (req, res) => {
	res.render(errorPath, {
		title: '404 file not found',
		error: 'page not found'
	});
});

app.listen(port, () => {
	console.log(`server up, visit localhost:${port}`);
});
