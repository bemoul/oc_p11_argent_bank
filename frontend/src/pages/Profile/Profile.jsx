import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../reducers/auth';
import { UserHeader } from '../../components/UserHeader/UserHeader';
import { Transactions } from '../../components/Transactions/Transactions';

/**
 * Displays user profile and transactions.
 * Redirects to /login if the user is not logged in.
 * 
 * @returns {JSX.Element} Profile Component
 */
const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, firstName, lastName } = useSelector((state) => state.auth);

  // Redirect to /login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Fetch user profile on mount or when `currentUser` changes
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(getUserProfile(token));
    }
  }, [dispatch]);


  return (
    <>
      <main className="main bg-dark">
        <UserHeader firstname={firstName} lastname={lastName} />
        <Transactions />
      </main>
    </>
  );
}

export default Profile;
