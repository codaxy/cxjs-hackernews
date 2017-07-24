import { Controller } from "cx/ui";
import { fetchUser } from "../../api";

export default class extends Controller {
	onInit() {
		this.load();
	}

	scrollToTop() {
		let scrollEl = document.scrollingElement || document.documentElement;
		scrollEl.scrollTop = 0;
	}

	load() {
		let id = this.store.get("$root.url").substring("~/user/".length);

		fetchUser(id).then(user => {
			this.scrollToTop();
			this.store.set("user", user);
		});
	}
}
