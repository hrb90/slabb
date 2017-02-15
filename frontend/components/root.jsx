import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import SignIn from './auth/signin';
import SignUp from './auth/signup';
import Main from './main';
import DMIndex from './channels/dms/dm_index';
import ChannelIndex from './channels/channels/channel_index';

const Root = ({ store }) => {
  const _redirectIfLoggedIn = (nextState, replace) => {
    if (store.getState().session.currentUser) {
      replace("/");
    }
  };

  const _ensureLoggedIn = (nextState, replace) => {
    if (!store.getState().session.currentUser) {
      replace("/login");
    }
  }

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component= { Main } onEnter={ _ensureLoggedIn }/>
          <Route path="/dms" component={ DMIndex } onEnter={_ensureLoggedIn} />
          <Route path="/channels" component={ ChannelIndex } onEnter={_ensureLoggedIn} />
          <Route path="/login" component={ SignIn } onEnter={ _redirectIfLoggedIn }/>
          <Route path="/signup" component={ SignUp } onEnter={ _redirectIfLoggedIn } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
