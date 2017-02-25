import React from 'react';
import { connect } from 'react-redux';
import { createReaction } from '../../../actions/reaction_actions';
import EmojiPicker from 'react-emoji-picker';
import emojiMap from 'react-emoji-picker/lib/emojiMap';

const emojiPickerStyles = {
  position: 'relative',
  left: 0, top: '3.9rem',
  backgroundColor: 'white',
  width: '100%',
  padding: '.3em .6em',
  border: '1px solid #0074d9',
  borderTop: 'none',
  zIndex: '2'
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createReaction: emojiName => dispatch(createReaction(ownProps.messageId)(emojiName))
});

class EmojiButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { emoji: "", showEmojiPicker: false };
    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  emojiPicker() {
    if(this.state.showEmojiPicker) {
      return (
        <div className="emoji-picker">
          <p ref={ p => this.emoji = p }>
            <label htmlFor="emoji">Emoji</label>
            <input name="emoji"
              id="emoji"
              value={this.state.emoji} autoComplete="off"
              type="search"
              onChange={this.updateState}
              onKeyDown={this.grabKeyPress}/>
            <EmojiPicker
              style={emojiPickerStyles}
              onSelect={name => {
                this.props.createReaction(name);
                this.toggleEmojiPicker();
              }}
              query={this.state.emoji}
            />
          </p>
        </div>
      );
    }
  }

  grabKeyPress(e) {
    if(e.keyCode === 13) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <i className={"fa fa-smile-o" + (this.state.showEmojiPicker ? " pinned" : "")}
        ref={ i => this.icon = i }
        onClick={ this.toggleEmojiPicker }
        aria-hidden="true">
        { this.emojiPicker() }
      </i>
    );
  }

  setEmoji(emoji) {
    this.setState({emoji: emoji});
  }

  toggleEmojiPicker() {
    this.setState({showEmojiPicker: !this.state.showEmojiPicker});
  }

  updateState(e) {
    this.setState({emoji: e.target.value});
  }
}

export default connect(null, mapDispatchToProps)(EmojiButton);
