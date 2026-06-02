import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";

//* components
import App from "./app/App";

//* actions
import { RESIZING } from "./store/actions/actions";

//* store
import store from "./store/store";

//=+ log della versione del sito all'avvio (presa da .env -> VITE_APP_VERSION)
console.log(
  `%c Lucia Zavatta %c v${import.meta.env.VITE_APP_VERSION} `,
  "background:#000; color:#fff; border-radius:3px 0 0 3px; padding:2px 4px;",
  "background:#e0651a; color:#fff; border-radius:0 3px 3px 0; padding:2px 4px;"
);

//=+ dispatch on resizing
window.addEventListener("resize", () => {
  store.dispatch(RESIZING());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
