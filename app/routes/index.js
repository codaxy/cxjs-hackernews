import AppLayout from "../layout";
import { Sandbox, Rescope } from "cx/widgets";

import Default from "./default";
import Item from "./item";

export default (
	<cx>
		<Sandbox key:bind="url" storage:bind="pages" outerLayout={AppLayout}>
			<Rescope bind="$page">
				<Default visible:expr="{$root.url}.indexOf('~/item/') != 0" />
				<Item visible:expr="{$root.url}.indexOf('~/item/') == 0" />
			</Rescope>
		</Sandbox>
	</cx>
);
