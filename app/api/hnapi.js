const baseURL = 'http://api.hackerwebapp.com';

const fetchJSON = path => {
	return fetch(`${baseURL}/${path}`)
		.then(r => {
			if (!r.ok)
				throw new Error(`Invalid response received. Status ${r.status} - ${r.statusText}`);
			return r;
		})
		.then(x => x.json());
};

export function fetchStories(channel = "news", page = 1) {
	return fetchJSON(`${channel}?page=${page}`);
}

export function fetchItem(id) {
	return fetchJSON(`item/${id}`);
}

export function fetchUser(user) {
	return fetchJSON(`user/${user}`);
}
