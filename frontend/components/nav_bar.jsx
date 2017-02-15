import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LogoutButton from './auth/logout_button';

class NavBar extends React.Component {
  render() {
    return (
      <aside className="nav-bar">
        <LogoutButton />
        <Link to="/channels">Channels</Link>
        <Link to="/dms">Direct messages</Link>
        I am a nav bar!
      </aside>
    );
  }
}

export default NavBar;
