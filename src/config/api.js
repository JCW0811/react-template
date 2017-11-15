import sfetch from 'sfetch'


export const getData = () => {
	let url = `./data.json`;
	return new Promise((resolve, reject) => {
		sfetch.get({
			url: url,
			timeout: 12000
		}).then((data) => {
			if (data.ok) {
				resolve(data.json)
			} else {
				reject(data)
			}
		});

	});
}


export const submitForm = (url,body) => {
	return new Promise((resolve, reject) => {
		sfetch.get({
			url: url,
			timeout: 12000,
			body:body
		}).then((data) => {
			if (data.ok) {
				resolve(data.json)
			} else {
				reject(data)
			}
		});

	});
}

