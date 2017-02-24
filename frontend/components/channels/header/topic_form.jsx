import React from 'react';

class TopicForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { topic: props.topic || "" };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.updateTopic = this.updateTopic.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state = { topic: nextProps.topic || "" };
  }

  componentWillUnmount() {
    this.handleBlur();
  }

  handleBlur() {
    this.topicInput.removeEventListener('keydown', this.handleKeydown);
    this.setState({topic: this.previousTopic});
  }

  handleFocus(e) {
    this.previousTopic = this.topicInput.value;
    this.topicInput.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(e) {
    switch(e.key) {
      case "Enter":
        this.props.update(this.state);
        this.previousTopic = this.topicInput.value;
        this.topicInput.blur();
        break;
      case "Escape":
        this.topicInput.blur();
        break;
      default:
        break;
    }
  }

  render() {
    if (this.props.isDisabled) {
      return (
        <input type="text"
          value={ this.state.topic }
          ref={ input => this.topicInput = input }
          disabled></input>
      );
    }
    else {
      return (
        <input type="text"
          onBlur={ this.handleBlur }
          onChange={ this.updateTopic }
          onFocus={ this.handleFocus }
          value={ this.state.topic }
          ref={ input => this.topicInput = input }
          placeholder="Looks like nobody has set a topic. Be the first!"></input>
      );
    }
  }

  updateTopic(e) {
    this.setState({topic: e.currentTarget.value});
  }
}

export default TopicForm;
