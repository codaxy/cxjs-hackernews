import { VDOM, Widget } from "cx/ui";
import {
	findScrollableParent,
	throttle,
	browserSupportsPassiveEventHandlers
} from "cx/util";

//Calculates height of the content below the bottom edge of the screen

export class InfiniteScrollAnchor extends Widget {
	render(context, instance, key) {
		return (
			<InfiniteScrollAnchorComponent
				key={key}
				onMeasure={depth => instance.invoke("onMeasure", depth, instance)}
			/>
		);
	}
}

class InfiniteScrollAnchorComponent extends VDOM.Component {
	render() {
		return (
			<div
				ref={el => {
					this.el = el;
				}}
			/>
		);
	}

	componentDidMount() {
		const scrollableParent = findScrollableParent(this.el);

		this.onScroll = throttle(() => {
			let depth =
				scrollableParent.scrollHeight -
				scrollableParent.scrollTop -
				scrollableParent.offsetHeight;
			this.props.onMeasure(depth);
		}, 100);

		window.addEventListener(
			"scroll",
			this.onScroll,
			browserSupportsPassiveEventHandlers() ? { passive: true } : false
		);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll);
	}
}
