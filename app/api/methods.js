import Firebase from "firebase/app";
import "firebase/database";

Firebase.initializeApp({
	databaseURL: "https://hacker-news.firebaseio.com"
});

let api = Firebase.database().ref("/v0");

export function fetchItem(id) {
	return api
		.child(`item/${id}`)
		.once("value")
		.then(x => x.val());
}

export function fetchStories(channel = "top", page = 1, pageSize = 30) {
	return api
		.child(channel + "stories")
		.limitToFirst(page * pageSize)
		.once("value")
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
	let subscribedCallback = snapshot => callback(snapshot.val());
	let ref = api.child(channel + "stories");

	ref.on("value", subscribedCallback);
	return () => {
		ref.off("value", subscribedCallback);
	};
}
