import React from 'react';
import { connect } from 'react-redux';
import ReactEmoji from 'react-emoji';
import ReactTooltip from 'react-tooltip';
import { createReaction, deleteReaction } from '../../../actions/reaction_actions';

const mapStateToProps = ({session}) => ({
  currentUserId: session.currentUser.id,
  currentUsername: session.currentUser.username
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createReaction: emojiName => dispatch(createReaction(ownProps.messageId)(emojiName)),
  deleteReaction: id => dispatch(deleteReaction(id))
});

const arrayReplace = (arr, oldVal, newVal) => {
  let oldIdx = arr.indexOf(oldVal);
  let newArr = arr.slice(0);
  if (oldIdx > -1) {
    newArr.splice(oldIdx, 1, newVal);
  }
  return newArr;
}

const EmojiBar = props => {
  const userListText = userList => {
    let yourName = userList.length === 1 ? "You (click to remove)" : "you";
    userList = arrayReplace(userList, props.currentUsername, yourName);
    switch(userList.length) {
      case 1:
        return userList[0];
      case 2:
        return `${userList[0]} and ${userList[1]}`;
      default:
        return userList.slice(0, -2)
          .concat([`${userList[userList.length - 2]} and ${userList[userList.length - 1]}`])
          .join(', ');
    }
  }
  const tooltipText = (reactionMap, emojiName) => (
    `${userListText(reactionMap[emojiName].map(rxn => rxn.username))} reacted with ${emojiName}`
  );
  let reactionMap = {};
  props.reactions.forEach(rxn => {
    reactionMap[rxn.emoji_name] = reactionMap[rxn.emoji_name] || [];
    reactionMap[rxn.emoji_name].push(rxn);
  });
  const myReaction = emojiName => {
    if (reactionMap[emojiName]){
      return reactionMap[emojiName].find(rxn => (rxn.user_id === props.currentUserId));
    } else {
      return undefined;
    }
  };
  const clickAction = emojiName => () => {
    let myRxn = myReaction(emojiName);
    if (myRxn) {
      return props.deleteReaction(myRxn.id);
    } else {
      return props.createReaction(emojiName);
    }
  };
  return (
    <span className="reaction-bar">
      { Object.keys(reactionMap).map(emojiName => (
        <div key={ emojiName }
          data-tip={ tooltipText(reactionMap, emojiName) }
          className={ "emoji" + (myReaction(emojiName) ? " pressed" : "") }
          onClick={ clickAction(emojiName) }>
          { ReactEmoji.emojify(emojiName) }
          { reactionMap[emojiName].length }
        </div>
      ))}
      <ReactTooltip />
    </span>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EmojiBar);
