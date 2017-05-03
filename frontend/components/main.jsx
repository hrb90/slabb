import React from 'react';
import NavBar from './nav_bar/nav_bar';
import Channel from './channels/channel';
import Pusher from './pusher';
import { FlexRow } from './primitives/styled_primitives';

const Main = props => (
  <FlexRow height="100vh">
    <NavBar />
    <Channel />
    <Pusher />
  </FlexRow>
);

export default Main;
