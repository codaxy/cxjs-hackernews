import {Controller} from 'cx/ui';
import {watchStories, fetchItem} from '../../api';

export default class extends Controller {
    onInit() {

        this.store.init('activeChannel', 'top');
        this.store.init('stories', []);

        this.addTrigger('nav', ['url'], url => {
            switch (url) {
                case '~/':
                case '~/top':
                    this.selectChannel('top');
                    break;

                case '~/new':
                    this.selectChannel('new');
                    break;

                case '~/show':
                    this.selectChannel('show');
                    break;

                case '~/ask':
                    this.selectChannel('ask');
                    break;

                case '~/jobs':
                    this.selectChannel('job');
                    break;

                default:
                    let regex = /~\/item\/([0-9]*)/;
                    let result = regex.exec(url);
                    let id = result && result[1];
                    if (id)
                        this.loadItem(id);
                    break;
            }
        }, true);

        this.addTrigger('channelChange', ['activeChannel'], ::this.loadChannel, true)

        this.addTrigger('visibleStories', ['stories', 'page'], (stories, page) => {
            let visible = [];
            let count = Math.min(stories.length, page * 30);
            let unloaded = 0;
            for (let i = 0; i < count; i++) {
                let item = stories[i];
                visible.push(item);
                if (!item.by) {
                    unloaded++;
                    fetchItem(item.id)
                        .then(fullItem => {
                            this.store.update('visibleStories', stories => stories.map(x => x.id === item.id ? fullItem : x));
                            this.store.set('status', 'ok');
                        });
                }
            }
            this.store.set('visibleStories', visible);
            if (unloaded == 0)
                this.store.set('status', 'ok');
        });
    }

    onDestroy() {
        this.unwatch();
    }

    unwatch() {
        if (this.unwatchStories) {
            this.unwatchStories();
            this.unwatchStories = null;
        }
    }

    scrollToTop() {
        let scrollEl = document.scrollingElement || document.documentElement;
        scrollEl.scrollTop = 0;
    }

    selectChannel(channel = 'top') {
        this.store.set('activeChannel', channel);
        this.store.set('show', 'stories');

        this.scrollToTop();
    }

    loadChannel() {
        let channel = this.store.get('activeChannel');
        if (channel == "item")
            return;

        this.unwatch();

        this.store.set('status', 'loading');
        this.store.set('page', 1);

        watchStories(channel, data => {
            this.store.set('stories', data);
        }).then(cb => this.unwatchStories = cb);
    }

    loadItem(id) {
        this.store.set('activeChannel', "item");
        this.store.delete('comments');
        api(({fetchItem}) => {
            fetchItem(id)
                .then(item => {
                    this.store.set('stories', [item]);
                    this.scrollToTop();
                    this.store.set('comments', item.kids.map(kid => ({id: kid})));
                    item.kids.forEach(kid => {
                        fetchItem(kid)
                            .then(item => {
                                this.store.update('comments', stories => stories.map(x => x.id === item.id ? item : x));
                                this.store.set('status', 'ok');
                            });
                    })
                });
        });
    }

    loadMore() {
        let status = this.store.get('status');
        if (status != 'ok')
            return;
        let stories = this.store.get('stories');
        this.store.update('page', page => Math.min(Math.ceil(stories.length / 30), page + 1));
        this.store.set('status', 'loading-more');
    }
}
