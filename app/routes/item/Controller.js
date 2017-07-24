import { Controller } from "cx/ui";
import { fetchItem } from "../../api";

export default class extends Controller {
	onInit() {
		this.load();
		this.scrollToTop();
	}

	scrollToTop() {
		let scrollEl = document.scrollingElement || document.documentElement;
		scrollEl.scrollTop = 0;
	}

	load(e) {
		if (e)
			e.preventDefault();

		let id = this.store.get("$root.url").substring("~/item/".length);
		if (this.store.get('item.status') != 'ok')
			this.store.set('status', 'loading');

		fetchItem(id)
			.then(item => {
				this.store.set("item", item);
				this.store.set('status', 'ok');
			})
			.catch(e => {
				console.error(e);
				this.store.set('status', 'error');
			})
	}
}
