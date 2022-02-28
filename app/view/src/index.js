/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, HashRouter } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Login from 'pages/login/Login'
import ForgotPassword from "pages/forgot-password/ForgotPass";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { Provider } from 'react-redux'
import store from 'store/store'
import './index.css'
import { SnackbarProvider } from "notistack";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}>
          <HashRouter>
            <Switch>
              <ProtectedRoute path="/admin" name="Dashboard" component={AdminLayout} />
              {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
              {/* <Route path="/rtl" render={(props) => <RTLLayout {...props} />} /> */}
              <Route path="/login" render={(props) => <Login {...props} />} />
              <Route path= "/forgot-password" render={(props) => <ForgotPassword {...props}/> }/>
              <Redirect from="/" to="/admin" />
            </Switch>
          </HashRouter>
        </SnackbarProvider>
      </Provider>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
);
