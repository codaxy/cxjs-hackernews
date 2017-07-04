import start from './index';
import "core-js/fn/promise";

if (window.fetch && Object.assign)
	start();
else
	System.import("./polyfill").then(start);
