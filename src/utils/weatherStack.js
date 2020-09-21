const request = require('request');
const weatherStackFunc = (location, callback) => {
	const coords = location;
	const url = `http://api.weatherstack.com/current?access_key=582a809471ad29cb4612d95b5bbe3e19&query=${coords}`;
	console.log(url);
	request({ url: url, json: true }, (error, response) => {
		if (response.body.success == false) {
			callback('please enter a valid location');
		} else if (response.error) {
			callback('please enter a location');
		} else {
			const data = {
				name: response.body.location.name,
				city: response.body.location.region,
				country: response.body.location.country,
				temp: response.body.current.temperature,
				time: response.body.current.observation_time,
				date: response.body.location.localtime,
				description: response.body.current.weather_descriptions,
				icon: response.body.current.weather_icons,
				windspeed: response.body.current.wind_speed
			};
			callback(undefined, data);
		}
	});
};
module.exports = weatherStackFunc;
