import {HtmlElement, Link, Repeater, Text, Icon, PureContainer} from 'cx/widgets';
import {Format} from 'cx/util';
import {ScrollDetector} from "../../components/ScrollDetector";

Format.register('age', v => {
    let value = Date.now()/1000 - v;
    if (value > 1.5 * 86400)
        return `${Math.round(value/86400).toFixed(0)} days ago`;

    if (value > 86400)
       return `a day ago`;

    if (value > 5400)
        return `${Math.round(value/3600).toFixed(0)} hours ago`;

    if (value > 3600)
        return `an hour ago`;

    if (value > 90)
        return `${Math.round(value/60).toFixed(0)} minutes ago`;

    if (value > 60)
        return `a minute ago`;

    return `${value.toFixed(0)} seconds ago`;
});

import Controller from './Controller';

export default <cx>
    <PureContainer controller={Controller}>
        <div class="loading" visible:expr="{status}=='loading'">
            <Icon name="loading"/> Loading...
        </div>
        <div visible:expr="{status}=='ok'">
            <ul
                class={{
                    "articles": true,
                }}
            >
                <Repeater records:bind="stories" cached idField="id">
                    <li class="article">
                        <h3>
                            <a text:bind="$record.title" href:bind="$record.url" target="_blank" rel="noopener"/>
                        </h3>
                        <p ws>
                            <span text:bind="$record.score"/> points by <i text:bind="$record.by"/>
                            <span text:tpl="{$record.time:age}" />
                        </p>
                        <aside class="comments-no" visible:expr="{$record.descendants}!=null">
                            <Link href:tpl="~/item/{$record.id}">
                                <span text:bind="$record.descendants"/> <br/> <Text
                                expr="{$record.descendants}==1 ? 'comment' : 'comments'"/>
                            </Link>
                        </aside>
                    </li>
                </Repeater>
            </ul>
        </div>
        <div visible:expr="{activeChannel}=='item'">
            <ul
                class={{
                    "comments": true,
                }}
            >
                <Repeater records:bind="comments" cached>
                    <li class="comment" visible:expr="!!{$record.text}">
                        <p>
                            <i text:bind="$record.by"/> <span text:tpl="{$record.time:age}" />
                        </p>
                        <p html:bind="$record.text"/>
                        <p visible:expr="{$record.kids.length} > 0">
                            <a href="#" text:tpl="{$record.kids.length} replies" />
                        </p>
                    </li>
                </Repeater>
            </ul>
        </div>
        <ScrollDetector onDetect="x"/>
    </PureContainer>
</cx>
