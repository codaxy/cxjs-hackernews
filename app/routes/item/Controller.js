import { Controller } from "cx/ui";
import { watchStories, fetchItem } from "../../api";

let items = {};

export default class extends Controller {
	onInit() {
		this.store.init("itemCache", 0); //for perf reasons store only the version of itemCache here
		this.load();
	}

	scrollToTop() {
		let scrollEl = document.scrollingElement || document.documentElement;
		scrollEl.scrollTop = 0;
	}

	loadSubcomments(node) {
		console.log(node);
		let kids = node.kids || [];
		return Promise.all(kids.map(kid => fetchItem(kid)));
	}

	load() {
		let id = this.store.get("$root.url").substring("~/item/".length);
		this.store.init("comments", []);

		fetchItem(id).then(item => {
			this.scrollToTop();
			this.store.set("visibleStories", [item]);
			let kids = item.kids || [];
			this.store.set("comments", kids.map(kid => ({ id: kid })));
			kids.forEach(kid => {
				fetchItem(kid).then(item => {
					this.store.update("comments", stories =>
						stories.map(x => (x.id === item.id ? item : x))
					);
					this.store.set("status", "ok");
				});
			});
		});
	}
}
