const input = document.querySelector('.input');
input.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		const endpoint = `http://localhost:3000/weather?address=${input.value}`;
		const req = axios.get(endpoint).then((response) => {
			if (response.data.error) {
				//creating message
				const errorMsg = document.createElement('p');
				errorMsg.classList.add('errorMsg');
				errorMsg.innerText = response.data.error;
				//creating div
				const divFour = document.createElement('div');
				divFour.classList.add('divFour');
				//appending to page
				const pageDiv = document.querySelector('.mainDiv');
				pageDiv.append(divFour);
				divFour.append(errorMsg);
				input.value = '';
				input.addEventListener('keypress', (e) => {
					if (e.key === 'Enter') {
						divFour.remove();
					}
				});
			} else {
				const { name, city, country, temp, description, icon, windspeed, date, time } = response.data.response;
				console.log(response);
				//defining variables
				const pageDiv = document.querySelector('.mainDiv');
				//creating div structure
				const jsDiv = document.createElement('div');
				const divOne = document.createElement('div');
				const divTwo = document.createElement('div');
				const divThree = document.createElement('div');
				jsDiv.classList.add('jsDiv');
				divOne.classList.add('divOne');
				divTwo.classList.add('divTwo');
				divThree.classList.add('divThree');
				//appending divs to page
				pageDiv.append(jsDiv);
				jsDiv.append(divOne, divTwo, divThree);
				//configuring data for divOne
				const location = document.createElement('h3');
				const dateDom = document.createElement('p');
				location.classList.add('locationHeading');
				dateDom.classList.add('date');
				location.innerText = `${name}, ${city}, ${country}`;
				dateDom.innerText = date;
				//configuring data for divTwo
				const subDiv = document.createElement('div');
				const tempDom = document.createElement('p');
				const tempDescp = document.createElement('p');
				const imgDom = document.createElement('img');
				imgDom.src = icon;
				tempDom.classList.add('temp');
				subDiv.classList.add('subDiv');
				tempDescp.classList.add('tempDescp');
				tempDescp.innerText = 'It is currently';
				tempDom.innerText = `${temp}°C`;
				//configuring data for divThree
				const descriptionDom = document.createElement('p');
				const windDom = document.createElement('p');
				descriptionDom.classList.add('descpDom');
				windDom.classList.add('windDom');
				descriptionDom.innerHTML = `forecast: <b>${description}</b>`;
				windDom.innerHTML = `wind: <b>${windspeed}km</b>`;
				//adding to dom
				divOne.append(location, dateDom);
				divTwo.append(subDiv, imgDom);
				subDiv.append(tempDescp, tempDom);
				divThree.append(descriptionDom, windDom);
				input.value = '';
				//removal of initial request
				input.addEventListener('keypress', (e) => {
					if (e.key === 'Enter') {
						jsDiv.remove();
					}
				});
			}
		});
	}
});
