import React from 'react';
import TopicForm from './topic_form';
import ClickableIcon from './clickable_icon';

const unsubscribeIcon = unsubscribe => (<ClickableIcon key="unsubscribeIcon"
  faName="fa-sign-out"
  altText="Unsubscribe from this channel"
  onClick={ unsubscribe } />);

const userListIcon = (<ClickableIcon key="userListIcon"
  faName="fa-user-o"
  altText="See a list of users"
  onClick={ () => {} } />);

const topicBar = (topic, update, disabled) => (
  <form key="topicBar" className="ch-topic-form">
    <TopicForm topic={ topic } update={ update } isDisabled={ disabled } />
  </form>
);

class ChannelHeader extends React.Component {
  getInfoBarComponents() {
    if (this.props.type === "channel") {
      if (this.props.isSubscribed) {
        return [unsubscribeIcon(this.props.unsubscribe),
          userListIcon,
          topicBar(this.props.topic, this.props.update, false)];
      } else {
        return [userListIcon,
          topicBar(this.props.topic, () => {}, true)
        ];
      }
    } else {
      return [(<ClickableIcon key="5" faName="fa-circle-thin" onClick={ () => {} } />)];
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
