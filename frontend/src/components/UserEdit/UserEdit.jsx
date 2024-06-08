import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profilEdit } from '../../reducers/authSlice';
import { userUpdateProfile } from '../../reducers/authThunks';

/**
 * UserEdit component for editing user's profile
 *
 * @param {Object} props - The component props
 * @param {string} props.firstname - The user's first name
 * @param {string} props.lastname - The user's last name
 * @returns {JSX.Element} The UserEdit component
 */
function UserEdit({ firstname, lastname }) {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCancelEdit = (e) => {
    e.preventDefault();
    dispatch(profilEdit());
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    let token = currentUser;
    console.log("token !!!!", token);
    let newFirstName = document.querySelector("#firstname").value;
    let newLastName = document.querySelector("#lastname").value;

    console.log("Save button clicked");
    console.log("New first name:", newFirstName);
    console.log("New last name:", newLastName);

    dispatch(userUpdateProfile({ newFirstName, newLastName, token }));
  };

  return (
    <div className="user-edit">
      <h2>Edit user info</h2>
      <div className="form-group">
        <label htmlFor="firstname">First name:</label>
        <input className="user-edit-input" id="firstname" type="text" defaultValue={firstname} />
      </div>
      <div className="form-group">
        <label htmlFor="lastname">Last name:</label>
        <input className="user-edit-input" id="lastname" type="text" defaultValue={lastname} />
      </div>
      <div className="button-group">
        <button className="save-btn" onClick={handleSaveEdit}>Save</button>
        <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
      </div>
    </div>
  );
}

export default UserEdit;
