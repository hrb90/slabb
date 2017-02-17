import React from 'react';

class TopicForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { topic: props.topic || "" };
    this.updateTopic = this.updateTopic.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state = { topic: nextProps.topic || "" };
  }

  render() {
    return (
      <form className="ch-topic-form"
        onSubmit={ this.props.onSubmit }>
        <input type="text"
          onChange={ this.updateTopic }
          value={ this.state.topic }></input>
      </form>
    );
  }

  updateTopic(e) {
    this.setState({topic: e.currentTarget.value});
  }
}

export default TopicForm;
