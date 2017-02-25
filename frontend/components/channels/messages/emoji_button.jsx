import React from 'react';
import { connect } from 'react-redux';
import { createReaction } from '../../../actions/reaction_actions';
import EmojiPicker from 'react-emoji-picker';
import emojiMap from 'react-emoji-picker/lib/emojiMap';

const emojiPickerStyles = {
  position: 'relative',
  left: 0, top: '1rem',
  backgroundColor: 'lightgrey',
  width: '100%',
  padding: '.3em .6em',
  border: 'none',
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
    this.iconClick = this.iconClick.bind(this);
    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  emojiPicker() {
    if(this.state.showEmojiPicker) {
      return (
        <div className="emoji-picker">
          <i className="fa fa-times picker-close pinned" />
          <input name="emoji"
            id="emoji"
            value={this.state.emoji} autoComplete="off"
            type="search"
            onChange={this.updateState}
            onKeyDown={this.grabKeyPress}/>
          <p>
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

  iconClick(e) {
    let targetClass = e.target.className;
    if (targetClass.includes("emoji-button") ||
          targetClass.includes("picker-close")) {
      this.toggleEmojiPicker();
    }
  }

  grabKeyPress(e) {
    if(e.keyCode === 13) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <i className={"fa fa-smile-o emoji-button" + (this.state.showEmojiPicker ? " pinned" : "")}
        ref={ i => this.icon = i }
        onClick={ this.iconClick }
        aria-hidden="true">
        { this.emojiPicker() }
      </i>
    );
  }

  setEmoji(emoji) {
    this.setState({emoji: emoji});
  }

  toggleEmojiPicker() {
    this.setState({emoji: "", showEmojiPicker: !this.state.showEmojiPicker});
  }

  updateState(e) {
    this.setState({emoji: e.target.value});
  }
}

export default connect(null, mapDispatchToProps)(EmojiButton);
