import {HtmlElement, Link, Button} from 'cx/widgets';
import {ContentPlaceholder} from 'cx/ui';
import Controller from "./Controller";

export default <cx>
    <div controller={Controller}>
        <main class="main">
            <div className="center">
                <ContentPlaceholder />
            </div>
        </main>
        <header class="header">
            <div className="center">
                <ContentPlaceholder name="header"/>
            </div>
        </header>
    </div>
</cx>
