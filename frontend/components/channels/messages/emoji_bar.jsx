import React from 'react';
import ReactEmoji from 'react-emoji';

const EmojiBar = ({reactions}) => (
  <span className="reaction-bar">
    { reactions.map(rxn => (
      <div key={ rxn.id } className="emoji">
        { ReactEmoji.emojify(rxn.emoji_name) }
      </div>
    ))}
  </span>
);

export default EmojiBar;
