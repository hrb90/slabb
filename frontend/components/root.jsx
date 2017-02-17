import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { loggedIn } from '../util/session_util';
import App from './app';
import SignIn from './auth/signin';
import SignUp from './auth/signup';
import Main from './main';

const Root = ({ store }) => {
  const _redirectIfLoggedIn = (nextState, replace) => {
    if (loggedIn(store.getState())) {
      replace("/");
    }
  };

  const _ensureLoggedIn = (nextState, replace) => {
    if (!loggedIn(store.getState())) {
      replace("/login");
    }
  }

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component= { Main } onEnter={ _ensureLoggedIn }/>
          <Route path="/login" component={ SignIn } onEnter={ _redirectIfLoggedIn }/>
          <Route path="/signup" component={ SignUp } onEnter={ _redirectIfLoggedIn } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
