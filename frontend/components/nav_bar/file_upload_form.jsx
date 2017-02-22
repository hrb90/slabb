import React from 'react';
import { connect } from 'react-redux';
import { updateUserAvatar } from '../../actions/user_actions';

const mapStateToProps = ({session}) => ({
  currentUserId: session.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  updateUserAvatar: (id, formData) => dispatch(updateUserAvatar(id, formData))
});


class FileUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageFile: null, imageUrl: null };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user[avatar]", this.state.imageFile);
    this.props.updateUserAvatar(this.props.currentUserId, formData)
      .then(() => this.uploadSuccessMessage.className="upload-success");
  }

  updateFile(e) {
    let file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
      this.uploadSuccessMessage.className="upload-success hidden";
    }
  }

  render() {
    return (
      <form className="avatar-form" onSubmit={ this.handleSubmit }>
        <img src={ this.state.imageUrl} />
        <input className="file-upload-input" type="file" onChange={ this.updateFile } />
        <input type="submit" value="Upload avatar" />
        <span ref={ span => this.uploadSuccessMessage = span }
          className="upload-success hidden">Upload successful!</span>
       </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadForm);