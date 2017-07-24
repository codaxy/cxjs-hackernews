import { Sandbox, Rescope } from "cx/widgets";
import { FirstVisibleChildLayout } from "cx/ui";

import Default from "./default";
import Item from "./item";
import User from "./user";

import AppLayout from "../layout";

export default (
	<cx>
		<Sandbox key:bind="url" storage:bind="pages" outerLayout={AppLayout}>
			<Rescope bind="$page" layout={FirstVisibleChildLayout}>
				<Item visible:expr="{$root.url}.indexOf('~/item/') == 0" />
				<User visible:expr="{$root.url}.indexOf('~/user/') == 0" />
				<Default />
			</Rescope>
		</Sandbox>
	</cx>
);
