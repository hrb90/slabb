import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions/user_actions';
import { createChannel } from '../../../actions/channel_actions';
import SearchBar from '../search_bar';
import SelectedUsers from './selected_users';
import UserList from './user_list';
import { makeArrayFromObject } from '../../../util/selectors';

const mapStateToProps = ({users, session}) => ({
  users: users,
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  createChannel: channel => dispatch(createChannel(channel))
});

class DMIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedUsers: [], query: "" };
    this.filter = this.filter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  filter(users) {
    return users.filter(user => {
      return user.username.toLowerCase().includes(this.state.query.toLowerCase())
        && user.id !== this.props.currentUser.id
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const dm_users = makeArrayFromObject(this.state.selectedUsers)
      .concat([this.props.currentUser]);
    this.props.createChannel({
      name: dm_users.map(user => user.username).join(","),
      channel_type: "dm",
      dm_user_ids: dm_users.map(user => user.id)
    });
    this.props.closeModal();
  }

  render() {
    return (
      <div className="modal-index-container">
        <div className="channel-index">
          <h1>Direct Messages</h1>
          <form className="search-bar-container" onSubmit={ this.handleSubmit }>
            <div className="search-bar dm-search-bar">
              <SelectedUsers selectedUsers={ makeArrayFromObject(this.state.selectedUsers) }
                removeUser={ this.removeUser }/>
              <SearchBar query={ this.state.query }
                updateQuery={ this.updateQuery }
                placeholder="Search Users" />
            </div>
            <input type="submit" value="Go"></input>
          </form>
          <UserList users={ this.filter(this.props.users) }
            selectUser={ this.selectUser } />
        </div>
      </div>
    );
  }

  selectUser(user) {
    return () => {
      this.setState({ selectedUsers: Object.assign({}, this.state.selectedUsers, {[user.id]: user}) });
    }
  }

  removeUser(id) {
    return () => {
      let selectedUsers = Object.assign(this.state.selectedUsers);
      delete selectedUsers[id];
      this.setState({ selectedUsers });
    }
  }

  updateQuery(newValue) {
    this.setState({query: newValue});
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DMIndex);
