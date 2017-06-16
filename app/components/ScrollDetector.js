import {VDOM, Widget} from "cx/ui";
import {findScrollableParent} from "cx/util";

export class ScrollDetector extends Widget {
    render(context, instance, key) {
        return <ScrollComponent key={key} />
    }
}

class ScrollComponent extends VDOM.Component {
    render() {
        return <div ref={el => {
            this.el = el;
        }}/>
    }

    componentDidMount() {
        const scrollableParent = findScrollableParent(this.el);

        this.onScroll = () => {
            console.log('scroll');
            if (scrollableParent.scrollTop > scrollableParent.scrollHeight - 3 * scrollableParent.offsetHeight / 2) {
                console.log(scrollableParent.scrollTop, scrollableParent.scrollHeight, scrollableParent.offsetHeight)
            }
        };

        window.addEventListener("scroll", this.onScroll, {passive: true});

        this.offScroll = () => { window.removeEventListener("scroll", this.offScroll); }
    }

    componentWillUnmount() {
        this.offScroll();
    }
}
