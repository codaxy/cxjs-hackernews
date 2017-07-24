import { Controller } from "cx/ui";
import { fetchStories } from "../../api";

export default class extends Controller {
	onInit() {
		let now = Date.now();
		//bust cache every 10 minutes
		if (!this.store.get('cached') || now - this.store.get('cached') > 10 * 60 * 1000) {
			this.store.set("stories", []);
			this.store.set("page", 0);
			this.store.set("nextPage", 1);
			this.store.set('cached', now);
		}
		this.scrollToTop();
		this.addTrigger('load', ['nextPage'], ::this.loadChannel, true);
	}

	scrollToTop() {
		let scrollEl = document.scrollingElement || document.documentElement;
		scrollEl.scrollTop = 0;
	}

	loadChannel() {
		let channel = this.store.get("$root.url").substring(2) || "news";
		let page = this.store.get('nextPage');
		if (page == this.store.get('page'))
			return;

		if (this.store.get("stories.length") == 0)
			this.store.set("status", "loading");

		fetchStories(channel, page)
			.then(moreStories => {
				this.store.update('stories', stories => [...stories, ...moreStories]);
				this.store.set("status", "ok");
				this.store.set('page', page);
			});
	}

	loadMore(depth) {
		let status = this.store.get("status");
		let stories = this.store.get("stories");
		if (stories.length > 0 && depth < 1000)
			this.store.set('nextPage', this.store.get('page') + 1);
	}
}
