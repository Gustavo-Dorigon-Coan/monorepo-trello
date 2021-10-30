import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, Router, Switch} from "react-router-dom";
import {Home} from "./pages/Home/home";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
      <Router history={customHistory}>
          <Switch>
              <Route path="/">
                  <Home />
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
