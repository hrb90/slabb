import React from 'react';
import { connect } from 'react-redux';
import DayContainer from './day_container';

const mapStateToProps = ({ currentChannel, session }) => ({
  messages: currentChannel.messages
});

const dateString = d => {
  let dateD = new Date(d);
  return dateD.toLocaleDateString();
}


const splitIntoDates = (msgs) => {
  let groups = [{msgs: [], date: null}];
  if (msgs.length > 0) {
    let currDate = dateString(msgs[0].created_at);
    groups[0].date = dateString(msgs[0].created_at);
    msgs.forEach(msg => {
      if (dateString(msg.created_at) != currDate) {
        groups.push({msgs: [msg], date: msg.created_at});
        currDate = dateString(msg.created_at);
      } else {
        groups[groups.length - 1].msgs.push(msg);
      }
    })
  }
  return groups;
}

const ChannelMessages = props => (
  <div className="msgs-container">
    { splitIntoDates(props.messages).map((dateGroup, idx) =>
      (<DayContainer messages={ dateGroup.msgs } date={ dateGroup.date } key={ idx }/>)) }
  </div>
)

export default connect(mapStateToProps)(ChannelMessages);
