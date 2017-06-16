import {Controller} from 'cx/ui';

export default class extends Controller {
    onInit() {

        this.store.init('activeChannel', 'top');

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

        this.store.set('status', 'loading');

        System.import('../../api/index.js')
            .then(({fetchStories, fetchItem}) => {
                fetchStories(channel)
                    .then(data => {
                        data.forEach(item => {
                            fetchItem(item.id)
                                .then(fullItem => {
                                    this.store.update('stories', stories => stories.map(x => x.id === item.id ? fullItem : x));
                                    this.store.set('status', 'ok');
                                });
                        });
                        this.store.set('stories', data);
                    });
            });
    }

    loadItem(id) {
        this.store.set('activeChannel', "item");
        this.store.delete('comments');
        System.import('../../api/index.js')
            .then(({fetchStories, fetchItem}) => {
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
}
