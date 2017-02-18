import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: props.message || "" };
    this.update = this.update.bind(this);
  }

  render() {
    return (
      <form className="message-form" onSubmit={ this.props.handleSubmit }>
        <textarea value={ this.state.message }
          onChange={ this.update }
          placeholder="Messages haven't been implemented quite yet. Check back in a couple days :)"></textarea>
      </form>
    );
  }

  update(e){
    this.setState({message: e.currentTarget.value});
  }
}

export default MessageForm;
