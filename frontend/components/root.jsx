import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SignIn from './auth/signin';
import SignUp from './auth/signup';

const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
        <Route path="/login" component={ SignIn } />
        <Route path="/signup" component={ SignUp } />
      </Route>
    </Router>
  </Provider>
)

export default Root;
