import React from "react";
import ReactDOM from "react-dom";
import "bootstrap";
import "../styles/index.scss";
import { App } from "./component/App.jsx";
import { GlobalProvider } from "./context/GlobalState.js";

ReactDOM.render(
	<GlobalProvider>
		<App />
	</GlobalProvider>,
	document.querySelector("#app")
);
