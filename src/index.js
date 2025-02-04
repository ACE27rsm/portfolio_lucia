import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";

//* components
import App from "./app/App";

//* actions
import { RESIZING } from "./store/actions/actions";

//* store
import store from "./store/store";

//=+ dispatch on resizing
window.addEventListener("resize", () => {
  store.dispatch(RESIZING());
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
