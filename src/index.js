import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./christmas.mp3";
import indexRoutes from "./routes/index.jsx";

const history = createBrowserHistory();

ReactDOM.render(
  <div>
    <div class="snowflakes" aria-hidden="true">
      <div class="snowflake">❤️</div>
      <div class="snowflake">❆</div>
      <div class="snowflake">❄️</div>
      <div class="snowflake">❤️</div>
      <div class="snowflake">❅</div>
      <div class="snowflake">❤️</div>
      <div class="snowflake">❄️</div>
      <div class="snowflake">❆</div>
      <div class="snowflake">🎁</div>
      <div class="snowflake">❤️</div>
      <div class="snowflake">🎁</div>
      <div class="snowflake">❄️</div>
    </div>
    <Router history={history}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route
              exact
              path={prop.path}
              key={key}
              component={prop.component}
            />
          );
        })}
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);
