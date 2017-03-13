import React from 'react';
import { connect } from 'react-redux';
import ReactEmoji from 'react-emoji';
import ReactTooltip from 'react-tooltip';
import { createReaction, deleteReaction } from '../../../actions/reaction_actions';

const mapStateToProps = ({session}) => ({
  currentUserId: session.currentUser.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createReaction: emojiName => dispatch(createReaction(ownProps.messageId)(emojiName)),
  deleteReaction: id => dispatch(deleteReaction(id))
});

const tooltipText = (reactionMap, emojiName) => (
  `${reactionMap[emojiName].map(rxn => rxn.username).join(',')} reacted with ${emojiName}`
);

const EmojiBar = props => {
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
