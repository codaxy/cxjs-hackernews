import {Controller} from 'cx/ui';
import {watchStories, fetchItem} from '../../api';

//cached across tabs
let items = {};

export default class extends Controller {
    onInit() {
        this.store.init('stories', []);
        this.store.init('itemCache', 0); //for perf reasons store only the version of itemCache here
        this.store.init('itemCount', 30);

        this.addTrigger('visibleStories', ['stories', 'itemCache', 'itemCount'], (stories, itemCache, itemCount) => {
            let visible = [];
            let count = Math.min(stories.length, itemCount);
            let unloaded = 0;
            for (let i = 0; i < count; i++) {
                let id = stories[i];
                let item = items[id] || {id, title: 'Loading'};
                visible.push(item);
                if (!item.by) {
                    unloaded++;
                    fetchItem(item.id)
                        .then(fullItem => {
                            this.store.update('itemCache', itemCache => itemCache + 1);
                            items[id] = fullItem;
                            this.store.set('status', 'ok');
                        });
                }
            }
            this.store.set('visibleStories', visible);
            if (unloaded == 0 && count > 0)
                this.store.set('status', 'ok');
        });

        this.loadChannel();
        this.scrollToTop();
    }

    onDestroy() {
        if (this.unwatchStories) {
            this.unwatchStories();
            this.unwatchStories = null;
        }
    }

    scrollToTop() {
        let scrollEl = document.scrollingElement || document.documentElement;
        scrollEl.scrollTop = 0;
    }

    loadChannel() {
        let channel = this.store.get('$root.url').substring(2) || 'top';
        if (this.store.get('stories.length') == 0)
            this.store.set('status', 'loading');

        watchStories(channel, data => {
            this.store.set('stories', data);
        }).then(cb => this.unwatchStories = cb);
    }

    loadMore(depth) {
        let status = this.store.get('status');
        let stories = this.store.get('stories');
        this.store.update('itemCount', itemCount => Math.min(stories.length, itemCount + Math.max(0, 15 - Math.ceil(depth / 80))));
    }
}
