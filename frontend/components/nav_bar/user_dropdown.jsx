import React from 'react';
import LogoutButton from '../auth/logout_button';
import FileUploadForm from './file_upload_form';

const UserDropdown = props => (
  <div className="modal-index-container user-dropdown">
    <FileUploadForm />
    <div className="temporary-placeholder"></div>
    <LogoutButton beforeLogoutCallback={ props.closeModal } />
  </div>
);

export default UserDropdown;
