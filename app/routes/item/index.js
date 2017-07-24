import {
	HtmlElement,
	Link,
	Repeater,
	Text,
	Icon,
	PureContainer
} from "cx/widgets";
import { Format } from "cx/util";
import { TreeAdapter } from "cx/ui";

import Controller from "./Controller";

export default (
	<cx>
		<PureContainer controller={Controller}>
			<div class="loading" visible:expr="{status}=='loading'">
				<Icon name="loading" /> Loading...
			</div>
			<div visible:expr="{status}=='error'" ws class="error">
				Error occurred while loading article. Please verify your Internet connection and
				<a href="#" onClick="load">retry</a>.
			</div>
			<div visible:expr="{status}=='ok'">
				<ul
					class={{
						articles: true
					}}
				>
						<li
							class="article"
							style={{
								animation: 'none'
							}}
						>
							<h3>
								<a
									text:bind="item.title"
									href:bind="item.url"
									target="_blank"
									rel="noopener"
								/>
							</h3>
							<p ws>
								<span text:bind="item.points" /> points by
								<Link href:tpl="~/user/{item.user}" text:bind="item.user" class="user" />
								<span text:tpl="{item.time:age}" />
							</p>
							<p html:bind="item.content" memoize={false} visible:expr="!!{item.content}" />
							<aside
								class="comments-no"
								visible:expr="{item.comments_count}!=0"
							>
								<Link href:tpl="~/item/{item.id}">
									<span text:bind="item.comments_count" /> <br />{" "}
									<Text expr="{item.comments_count}==1 ? 'comment' : 'comments'" />
								</Link>
							</aside>
						</li>
				</ul>
			</div>
			<ul
				class={{
					comments: true
				}}
			>
				<Repeater
					records:bind="item.comments"
					cached={false}
					dataAdapter={{
						type: TreeAdapter,
						childrenField: 'comments'
					}}
				>
					<li
						class="comment"
						visible:expr="!!{$record.content}"
						style={{
							paddingLeft: { expr: "({$record.$level} + 1) * 30" }
						}}
					>
						<p ws>
							<Link href:tpl="~/user/{$record.user}" text:bind="$record.user" class="user" />
							<span text:tpl="{$record.time:age}" />
						</p>
						<p html:bind="$record.content" memoize={false} />
						<p visible:expr="{$record.comments.length} > 0">
							<a
								visible:expr="!{$record.$expanded}"
								href="#"
								text:expr="{$record.comments.length} + ' ' + ({$record.comments.length} == 1 ? 'reply' : 'replies')"
								onClick={(e, { store }) => {
									store.toggle("$record.$expanded");
									e.preventDefault();
								}}
							/>
							<Icon name="loading" visible:expr="{$record.$loading}" />
						</p>
					</li>
				</Repeater>
			</ul>
		</PureContainer>
	</cx>
);
