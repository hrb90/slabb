import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions/user_actions';
import { createChannel } from '../../../actions/channel_actions';
import DMSearchBar from './dm_search_bar';
import DMList from './dm_list';
import { makeArrayFromObject } from '../../../util/selectors';

const mapUsersToConvos = users => {
  function extractConvoFromUser(user) {
    return { name: user.username, key: "user-" + user.id, user: user };
  }
  return users.map(extractConvoFromUser);
}

const mapStateToProps = ({users, session}) => ({
  conversations: mapUsersToConvos(users),
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
    this.selectUser = this.selectUser.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  filter(conversations) {
    return conversations.filter(convo => {
      return convo.name.includes(this.state.query)
        && convo.user.id !== this.props.currentUser.id
    });
  }

  render() {
    return (
      <div>
        <DMSearchBar selectedUsers={ makeArrayFromObject(this.state.selectedUsers) }
          queryString={ this.state.query }
          updateQuery={ this.updateQuery }
          createChannel={ this.props.createChannel }
          currentUser={ this.props.currentUser }/>
        <DMList conversations={ this.filter(this.props.conversations) } selectUser={ this.selectUser } />
      </div>
    );
  }

  selectUser(user) {
    console.log("User clicked!");
    this.setState({ selectedUsers: Object.assign({}, this.state.selectedUsers, {[user.id]: user}) });
  }

  updateQuery(newValue) {
    this.setState({query: newValue});
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DMIndex);
