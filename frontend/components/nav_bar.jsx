import React from 'react';
import { connect } from 'react-redux';
import LogoutButton from './auth/logout_button';

class NavBar extends React.Component {
  render() {
    return (
      <aside className="nav-bar">
        <LogoutButton />
        I am a nav bar!
      </aside>
    );
  }
}

export default NavBar;
