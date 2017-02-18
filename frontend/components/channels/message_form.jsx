import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content || "" };
    this.update = this.update.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleBlur() {
    this.messageTextArea.removeEventListener('keydown', this.handleKeydown);
  }

  handleFocus() {
    this.messageTextArea.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(e) {
    switch(e.key) {
      case "Enter":
        e.preventDefault();
        this.props.submitCallback(this.state);
        this.setState({content: ""});
        break;
      case "Escape":
        this.messageTextArea.blur();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <form className="message-form">
        <textarea value={ this.state.content }
          onChange={ this.update }
          onFocus={ this.handleFocus }
          onBlur={ this.handleBlur }
          ref={ textarea => this.messageTextArea = textarea }></textarea>
      </form>
    );
  }

  update(e){
    this.setState({content: e.currentTarget.value});
  }
}

export default MessageForm;
