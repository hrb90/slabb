import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content || "" };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitCallback(this.state);
  }

  render() {
    return (
      <form className="message-form" onSubmit={ this.handleSubmit }>
        <textarea value={ this.state.content }
          onChange={ this.update }
          placeholder="Messages haven't been implemented quite yet. Check back in a couple days :)"></textarea>
        <input type="submit" value="Submit"></input>
      </form>
    );
  }

  update(e){
    this.setState({content: e.currentTarget.value});
  }
}

export default MessageForm;
