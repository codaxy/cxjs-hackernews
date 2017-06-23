const methods = System.import("./methods");

export default function(callback) {
	return methods.then(module => callback(module));
}

export const watchStories = (...args) =>
	methods.then(m => m.watchStories(...args));

export const fetchItem = (...args) => methods.then(m => m.fetchItem(...args));
