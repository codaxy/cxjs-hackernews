import {
	HtmlElement,
	Link,
	Repeater,
	Text,
	Icon,
	PureContainer
} from "cx/widgets";
import { Format } from "cx/util";
import { InfiniteScrollAnchor } from "../../components/InfiniteScrollAnchor";

Format.register("age", v => {
	let value = Date.now() / 1000 - v;
	if (value > 1.5 * 86400)
		return `${Math.round(value / 86400).toFixed(0)} days ago`;

	if (value > 86400) return `a day ago`;

	if (value > 5400) return `${Math.round(value / 3600).toFixed(0)} hours ago`;

	if (value > 3600) return `an hour ago`;

	if (value > 90) return `${Math.round(value / 60).toFixed(0)} minutes ago`;

	if (value > 60) return `a minute ago`;

	return `${value.toFixed(0)} seconds ago`;
});

import Controller from "./Controller";

export default (
	<cx>
		<PureContainer controller={Controller}>
			<div class="loading" visible:expr="{status}=='loading'">
				<Icon name="loading" /> Loading...
			</div>
			<div visible:expr="{status}!='loading'">
				<ul
					class={{
						articles: true
					}}
				>
					<Repeater records:bind="stories" cached idField="id">
						<li
							class="article"
							style={{
								animationDelay: {
									tpl: "{[({$index} < 30 && {$index} || 0) * 20]}ms"
								}
							}}
						>
							<h3>
								<a
									text:bind="$record.title"
									href:bind="$record.url"
									target="_blank"
									rel="noopener"
								/>
							</h3>
							<p ws>
								<span text:bind="$record.points" /> points by{" "}
								<Link href:tpl="~/user/{$record.user}" text:bind="$record.user" class="user" />
								<span text:tpl="{$record.time:age}" />
							</p>
							<aside
								class="comments-no"
								visible:expr="{$record.comments_count}!=null"
							>
								<Link href:tpl="~/item/{$record.id}">
									<span text:bind="$record.comments_count" /> <br />{" "}
									<Text expr="{$record.comments_count}==1 ? 'comment' : 'comments'" />
								</Link>
							</aside>
						</li>
					</Repeater>
				</ul>
			</div>
			<InfiniteScrollAnchor onMeasure="loadMore" />
		</PureContainer>
	</cx>
);
