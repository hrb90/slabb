import React from 'react';
var EmojiPicker = require('react-emoji-picker');
var emojiMap = require('react-emoji-picker/lib/emojiMap');

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

class EmojiInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { emoji: "", showEmojiPicker: false };
    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.setEmoji = this.setEmoji.bind(this);
    this.updateState = this.updateState.bind(this);
    this.validateEmoji = this.validateEmoji.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.toggleEmojiPicker, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleEmojiPicker, false);
  }

  emojiPicker() {
    if(this.state.showEmojiPicker) {
      return (
        <EmojiPicker
          style={emojiPickerStyles} onSelect={this.setEmoji}
          query={this.state.emoji}
        />
      )
    }
  }

  grabKeyPress(e) {
    if(e.keyCode === 13) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <p ref={ p => this.emoji = p }>
        <label htmlFor="emoji">Emoji</label>
        <input name="emoji"
          id="emoji"
          value={this.state.emoji} autoComplete="off"
          type={this.state.showEmojiPicker ? "search" : "text"}
          onChange={this.updateState} onKeyDown={this.grabKeyPress}/>
        {this.emojiPicker()}
      </p>
    )
  }

  setEmoji(emoji) {
    this.setState({emoji: emoji});
  }

  toggleEmojiPicker(e) {
    if(this.emoji.contains(e.target)) {
      this.setState({ showEmojiPicker: true });
    } else {
      setTimeout(this.validateEmoji, 10)
      this.setState({ showEmojiPicker: false });
    }
  }

  updateState(e) {
    this.setState({emoji: e.target.value});
  }

  validateEmoji() {
    var matched = emojiMap.filter(emoji =>
      `:${emoji.name}:` === this.state.emoji);

    if(matched.length === 0) {
      this.setState({emoji: null})
    }
  }
}

export default EmojiInput;
