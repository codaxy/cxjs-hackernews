import { HtmlElement, Link, Icon } from "cx/widgets";
import { ContentPlaceholder } from "cx/ui";
import Controller from "./Controller";

export default (
	<cx>
		<div controller={Controller}>
			<main class="main">
				<div className="center">
					<ContentPlaceholder />
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
						<Link href="~/job" url:bind="url">Jobs</Link>
						<a
							class="cx-logo"
							href="https://cxjs.io/"
							target="_blank"
							aria-label="CxJS"
							rel="noopener"
						>
							<Icon name="cx" />
						</a>
					</div>
				</div>
			</header>
		</div>
	</cx>
);
