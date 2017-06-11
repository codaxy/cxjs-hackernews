import {HtmlElement, Link, Repeater, Text, Icon} from 'cx/widgets';

import Controller from './Controller';


export default <cx>
    <h2 putInto="header">
        Home
    </h2>

    <div>
        <Icon name="loading" /> Loading...
    </div>

    <ul
        visible:expr="{status}=='ok'"
        class={{
            "articles": true,
        }}
        controller={Controller}
    >
        <Repeater records:bind="stories" cached>
            <li class="article">
                <h3>
                    <a text:bind="$record.title" href:bind="$record.url" target="_blank" rel="noopener"/>
                </h3>
                <p>
                    <span text:bind="$record.score" /> points by <i text:bind="$record.by" />
                </p>
                <aside class="comments">
                    <Link href="#">
                        <span text:bind="$record.descendants" /> <br/> <Text expr="{$record.descendants}==1 ? 'comment' : 'comments'" />
                    </Link>
                </aside>
            </li>
        </Repeater>
    </ul>
</cx>
