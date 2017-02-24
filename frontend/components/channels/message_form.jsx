import React from 'react';
import { merge } from 'lodash';

const doNothing = () => {};

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.blurCallback = this.props.blurCallback || doNothing;
    this.focusCallback = this.props.focusCallback || doNothing;
    this.state = { content: props.content || "" };
    this.update = this.update.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    if (this.props.focusOnMount) {
      this.messageTextArea.focus();
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.resetOnChange !== nextProps.resetOnChange) {
      this.setState({content: ""});
    }
  }

  handleBlur() {
    this.blurCallback();
    this.messageTextArea.removeEventListener('keydown', this.handleKeydown);
  }

  handleFocus() {
    this.focusCallback();
    this.messageTextArea.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(e) {
    switch(e.key) {
      case "Enter":
        e.preventDefault();
        let passToCallback = this.state;
        if (this.props.messageId) {
          passToCallback = merge(passToCallback, {id: this.props.messageId});
        }
        this.props.submitCallback(passToCallback);
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
          ref={ textarea => this.messageTextArea = textarea }
          placeholder={ this.props.placeholder || "" }></textarea>
      </form>
    );
  }

  update(e){
    this.setState({content: e.currentTarget.value});
  }
}

export default MessageForm;
