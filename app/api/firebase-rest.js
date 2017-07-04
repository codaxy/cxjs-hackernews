let baseUrl ='https://hacker-news.firebaseio.com/v0';

const fetchJSON = path => {
	return fetch(`${baseUrl}/${path}.json`)
		.then(r => {
			if (!r.ok)
				throw new Error(`Invalid response received. Status ${r.status} - ${r.statusText}`);
			return r;
		})
		.then(x => x.json());
};

export function fetchItem(id) {
	return fetchJSON(`item/${id}`);
}

export function fetchStories(channel = "top", page = 1, pageSize = 30) {
	return fetchJSON(channel + `stories?limitToFirst=${page * pageSize}`)
		.then(snapshot =>
			snapshot
				.val()
				.map(id => ({
					id,
					title: "Loading"
				}))
				.slice((page - 1) * pageSize)
		);
}

export function watchStories(channel = "top", callback) {
	fetchJSON(channel + "stories")
		.then(callback);

	let timer = setInterval(() => {
		fetchJSON(channel + "stories")
			.then(callback);
	}, 60 * 1000);

	return () => {
		clearInterval(timer);
	};
}
