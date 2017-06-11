import Firebase from 'firebase/app'
import 'firebase/database'

Firebase.initializeApp({
    databaseURL: 'https://hacker-news.firebaseio.com'
});

let api = Firebase.database().ref('/v0');

let itemCache = {};

export function fetchItem(id) {
    let item = itemCache[id];
    if (item)
        return Promise.resolve(item);

    return api.child(`item/${id}`)
        .once('value')
        .then(x => x.val());
}

export function fetchStories(channel = 'top', page = 1) {
    return api.child(channel + 'stories')
        .limitToFirst(30)
        .once('value')
        .then(s => s.val().map(id => ({
            id,
            title: 'Loading'
        })));
}