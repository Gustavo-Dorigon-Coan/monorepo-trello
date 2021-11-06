import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { createBrowserHistory } from "history";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "./common/utils/theme";
import {Login} from "./components/Login/Login";
import {Home} from "./components/Home/Home";
import {NewAccount} from "./components/NewAccount/NewAccount";
import {AppTitle} from "./common/constants/Constants";
import {Project} from "./components/Project/Project";

export const history = createBrowserHistory();

document.title = AppTitle;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/new-account" component={NewAccount} />
          <Route path="/project/:id" component={Project} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
