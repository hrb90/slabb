import React from 'react';
import ReactDOM from 'react-dom';
import { attachAll } from './attach_to_window';
import configureStore from './store/store';
import Root from './components/root';

attachAll();

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState;
  if (window.currentUser) {
    preloadedState = { session: { currentUser: window.currentUser } };
  } else {
    preloadedState = {};
  }
  let store = configureStore(preloadedState);
  window.store = store;
  let root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);
});
