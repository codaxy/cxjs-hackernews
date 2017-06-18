import {VDOM, Widget} from "cx/ui";
import {findScrollableParent} from "cx/util";

export class ScrollDetector extends Widget {
    render(context, instance, key) {
        return <ScrollComponent
            key={key}
            triggerZoneHeight={this.triggerZoneHeight}
            onDetect={() => instance.invoke('onDetect', instance)}
        />
    }
}

ScrollDetector.prototype.triggerZoneHeight = 1500;

class ScrollComponent extends VDOM.Component {
    render() {
        return <div ref={el => {
            this.el = el;
        }}/>
    }

    componentDidMount() {
        const scrollableParent = findScrollableParent(this.el);

        this.onScroll = () => {
            if (scrollableParent.scrollTop + scrollableParent.offsetHeight + this.props.triggerZoneHeight > scrollableParent.scrollHeight)
                this.props.onDetect();
        };

        window.addEventListener("scroll", this.onScroll, {passive: true});

        this.offScroll = () => {
            window.removeEventListener("scroll", this.offScroll);
        }
    }

    componentWillUnmount() {
        this.offScroll();
    }
}
