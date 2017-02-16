import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({currentChannel}) => ({
  name: currentChannel.name,
  topic: currentChannel.topic
});

const Channel = (props) => (
  <div>    
    <span>{ props.name }</span>
    <span>{ props.topic }</span>
  </div>
);

export default connect(mapStateToProps)(Channel);
