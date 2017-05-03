import React from 'react';
import { connect } from 'react-redux';
import { updateUserAvatar } from '../../actions/user_actions';

const mapStateToProps = ({session}) => ({
  currentUserId: session.currentUser.id,
  avatar_url: session.currentUser.avatar_url
});

const mapDispatchToProps = dispatch => ({
  updateUserAvatar: (id, formData) => dispatch(updateUserAvatar(id, formData))
});


class FileUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageFile: null, imageUrl: this.props.avatar_url || null, uploadButtonClass: "hidden" };
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
      this.setState({ imageFile: file, imageUrl: fileReader.result, uploadButtonClass: "" });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
      this.uploadSuccessMessage.className="upload-success hidden";
    }
  }

  render() {
    return (
      <form className="avatar-form" onSubmit={ this.handleSubmit }>
        <label className="avatar-container">
          Your avatar
          <img src={ this.state.imageUrl}>
          </img>
          <p className="avatar-hint">Change your avatar</p>
          <input className="file-upload-input hidden" type="file" onChange={ this.updateFile } />
        </label>
        <input className={ this.state.uploadButtonClass } type="submit" value="Upload avatar" />
        <span ref={ span => this.uploadSuccessMessage = span }
          className="upload-success hidden">Upload successful!</span>
       </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadForm);
