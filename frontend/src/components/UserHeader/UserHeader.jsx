import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profilEdit } from '../../reducers/authSlice';
import UserEdit from '../UserEdit/UserEdit';

/**
 * UserHeader component for displaying user's information
 *
 * @returns {JSX.Element} UserHeader component
 */
export const UserHeader = () => {
  const dispatch = useDispatch();
  const { userName, firstName, lastName, isUserEdit } = useSelector((state) => state.auth);

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(profilEdit());
  };

  return (
    <div className="header">
      <h1>Welcome back {firstName} {lastName}!</h1>
      <div className="user">
        {isUserEdit ? (
          <UserEdit userName={userName} firstname={firstName} lastname={lastName} />
        ) : (
          <button className="edit-button" onClick={handleEdit}>Edit Name</button>
        )}
      </div>
    </div>
  );
};
