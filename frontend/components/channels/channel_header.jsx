import React from 'react';
import TopicForm from './topic_form';

class ChannelHeader extends React.Component {
  getInfoBarComponents() {
    if (this.props.type === "channel") {
      return [(<i className="fa fa-sign-out"
        key="1"
        aria-hidden="true"
        alt="Unsubscribe from this channel"
        onClick={ this.props.unsubscribe }></i>),
      (<i className="fa fa-user-o"
        key="2"
        alt="See a list of users, eventually"
        aria-hidden="true"></i>),
      (<TopicForm
         key="3"
         topic = { this.props.topic }
         update={ this.props.update } />)];
    } else {
      return [(<i className="fa fa-circle-thin" key="1" aria-hidden="true"></i>)];
    }
  }

  render() {
    return (
      <div className="channel-header">
        <h1>{ this.props.channelName }</h1>
        <div className="ch-info-bar">
          { this.getInfoBarComponents() }
        </div>
      </div>
    );
  }
}

export default ChannelHeader;
