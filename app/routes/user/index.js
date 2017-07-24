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
			<div visible:expr="{status}!='loading'" class="article">
				<p>
					<strong text:bind="user.id" />
				</p>
				<p text:tpl="Registered {user.created}." />
				<p text:tpl="{user.karma} karma points." />
			</div>
		</PureContainer>
	</cx>
);
