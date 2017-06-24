import { Store } from "cx/data";
import { Url, History, Widget, startAppLoop, ContentResolver } from "cx/ui";
import { Timing, Debug } from "cx/util";
//css
import "./index.scss";

//store
const store = new Store();

//webpack (HMR)
if (module.hot) {
	// accept itself
	module.hot.accept();

	// remember data on dispose
	module.hot.dispose(function(data) {
		data.state = store.getData();
		if (stop) stop();
	});

	//apply data on hot replace
	if (module.hot.data) store.load(module.hot.data.state);
}

//routing

//Url.setBaseFromScript("app.js");
History.connect(store, "url");

//debug

Widget.resetCounter();
Timing.enable("app-loop");
Debug.enable("app-data");

//app loop
//import Routes from "./routes";
import AppLayout from "./layout";


let app = <cx>
	<ContentResolver
		outerLayout={AppLayout}
		params={1}
		onResolve={()=>System.import("./routes").then(m=>m.default)}
	/>
</cx>

let stop = startAppLoop(document.getElementById("app"), store, app);

// service worker
if (location.protocol == "https:" && navigator.serviceWorker) {
	navigator.serviceWorker.register("/service-worker.js");
}
