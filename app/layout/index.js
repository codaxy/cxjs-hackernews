import {HtmlElement, Link, Button} from 'cx/widgets';
import {ContentPlaceholder} from 'cx/ui';
import Controller from "./Controller";

export default <cx>
    <div controller={Controller}>
        <main class="main">
            <div className="center">
                <ContentPlaceholder/>
            </div>
        </main>
        <header class="header">
            <div className="center" ws>
                <div class="content">

                    <h1><Link href="~/">HN</Link></h1>

                    <Link href="~/" url:bind="url">Top</Link>
                    <Link href="~/new" url:bind="url">New</Link>
                    <Link href="~/show" url:bind="url">Show</Link>
                    <Link href="~/ask" url:bind="url">Ask</Link>
                    <Link href="~/jobs" url:bind="url">Jobs</Link>
                </div>
            </div>
        </header>
    </div>
</cx>
