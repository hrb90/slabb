import React from 'react';
import UserList from './dms/user_list';
import { connect } from 'react-redux';

const mapStateToProps = ({ currentChannel }) => ({
  name: currentChannel.name,
  description: currentChannel.description,
  subscribers: currentChannel.subscribers
});

class ChannelSidebar extends React.Component {
  render() {
    return (
      <aside ref={ aside => this.sidebar = aside }
        id="channel-sidebar"
        className="hidden">
        <section>
          <i className  ="fa fa-times close-button"
            onClick={ () => {
              console.log("Clicked!");
              this.sidebar.className="hidden";
            }}></i>
          <h2>About { this.props.name }</h2>
        </section>
        <section>
          <h3>Description</h3>
          <p>{ this.props.description }</p>
        </section>
        <section>
          <h3>Subscribers</h3>
          <UserList users={ this.props.subscribers } selectUser={ () => {} } />
        </section>
      </aside>
    );
  }
}

export default connect(mapStateToProps)(ChannelSidebar);
