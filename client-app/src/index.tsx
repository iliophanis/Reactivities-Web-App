import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import ScrollToTop from "./app/layout/ScrollToTop";
//go to top of page with ScrollToTop of react router dom package

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop/>
      <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
