import React from 'react';
import NavBar from './nav_bar';
import Channel from './channels/channel';

const Main = props => (
  <div className="main-page">
    <NavBar />
    <Channel />
  </div>
);

export default Main;
