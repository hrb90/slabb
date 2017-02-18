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

  handleBlur(e) {
    e.currentTarget.removeEventListener('keydown', this.handleKeydown);
    this.setState({topic: this.previousTopic});
  }

  handleFocus(e) {
    this.previousTopic = e.currentTarget.value;
    e.currentTarget.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(e) {
    switch(e.key) {
      case "Enter":
        this.props.update(this.state);
        this.previousTopic = e.currentTarget.value;
        e.currentTarget.blur();
        break;
      case "Escape":
        e.currentTarget.blur();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <form className="ch-topic-form">
        <input type="text"
          onBlur={ this.handleBlur }
          onChange={ this.updateTopic }
          onFocus={ this.handleFocus }
          value={ this.state.topic }></input>
      </form>
    );
  }

  updateTopic(e) {
    this.setState({topic: e.currentTarget.value});
  }
}

export default TopicForm;
