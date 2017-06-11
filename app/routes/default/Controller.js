import {Controller} from 'cx/ui';
import {fetchStories, fetchItem} from '../../api';

export default class extends Controller {
    onInit() {
        this.store.set('status', 'loading');
        fetchStories()
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
    }
}
