import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { createBrowserHistory } from "history";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "./common/utils/theme";
import {Login} from "./pages/Login/Login";
import {Home} from "./pages/Home/Home";
import {NewAccount} from "./pages/NewAccount/NewAccount";
import {AppTitle} from "./common/constants/Constants";
import {Project} from "./pages/Project/Project";
import store from "./common/utils/store";
import { Provider } from 'react-redux';
import {AlertStyled} from "./common/components/AlertStyled/AlertStyled";
import {Modals} from "./modals";

export const history = createBrowserHistory();

document.title = AppTitle;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/new-account" component={NewAccount} />
            <Route path="/project/:id" component={Project} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
        <AlertStyled/>
        <Modals />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
