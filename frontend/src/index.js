import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, Router, Switch} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage";
import { createBrowserHistory } from "history";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "./common/utils/theme";

const customHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router history={customHistory}>
          <Switch>
              <Route path="/">
                  <HomePage />
              </Route>
          </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
