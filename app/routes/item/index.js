import {HtmlElement, Link, Repeater, Text, Icon, PureContainer} from 'cx/widgets';
import {Format} from 'cx/util';
import {TreeAdapter} from 'cx/ui';
import {InfiniteScrollAnchor} from "../../components/InfiniteScrollAnchor";

Format.register('age', v => {
    let value = Date.now() / 1000 - v;
    if (value > 1.5 * 86400)
        return `${Math.round(value / 86400).toFixed(0)} days ago`;

    if (value > 86400)
        return `a day ago`;

    if (value > 5400)
        return `${Math.round(value / 3600).toFixed(0)} hours ago`;

    if (value > 3600)
        return `an hour ago`;

    if (value > 90)
        return `${Math.round(value / 60).toFixed(0)} minutes ago`;

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
        <div visible:expr="{status}!='loading'">
            <ul
                class={{
                    "articles": true,
                }}
            >
                <Repeater records:bind="visibleStories" cached idField="id">
                    <li
                        class="article"
                        style={{
                            animationDelay: {tpl: "{[{$index} % 30 * 50]}ms"}
                        }}
                    >
                        <h3>
                            <a text:bind="$record.title" href:bind="$record.url" target="_blank" rel="noopener"/>
                        </h3>
                        <p ws>
                            <span text:bind="$record.score"/> points by <i text:bind="$record.by"/>
                            <span text:tpl="{$record.time:age}"/>
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
        <ul
            class={{
                "comments": true,
            }}
        >
            <Repeater
                records:bind="comments"
                cached
                dataAdapter={{
                    type: TreeAdapter,
                    load: (context, {controller}, node) => controller.loadSubcomments(node)
                }}
            >
                <li
                    class="comment"
                    visible:expr="!!{$record.text}"
                    style={{
                        paddingLeft: {expr: '({$record.$level} + 1) * 30'}
                    }}
                >
                    <p>
                        <i text:bind="$record.by"/> <span text:tpl="{$record.time:age}"/>
                    </p>
                    <p html:bind="$record.text"/>
                    <p visible:expr="{$record.kids.length} > 0">
                        <a
                            visible:expr="!{$record.$expanded}"
                            href="#"
                            text:expr="{$record.kids.length} + ' ' + ({$record.kids.length} == 1 ? 'reply' : 'replies')"
                            onClick={(e, {store}) => {
                                store.toggle('$record.$expanded');
                                e.preventDefault();
                            }} />
                        <Icon name="loading" visible:expr="{$record.$loading}" />
                    </p>
                </li>
            </Repeater>
        </ul>
    </PureContainer>
</cx>
