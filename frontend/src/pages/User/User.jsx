import React, { useEffect } from 'react';

import UserHeader from '../../components/UserHeader/UserHeader';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeSelector } from '../../store/storeSelectors';
import { userProfile } from '../../store/storeActions';
import { Transactions } from '../../components/Transactions/Transactions';


function User() {
  const user = useSelector(storeSelector);
  const dispatch = useDispatch();

  const authToken = user.authToken;
  let firstName = user.userFirstName;
  let lastName = user.userLastName;
  
  if (!authToken) {
      return <Navigate to="/signin" />
  }
  
  useEffect(() => {
      dispatch(userProfile(authToken));
  }, [])

  return (
      <React.Fragment>
          <main className="main bg-dark">
              <UserHeader firstname={firstName} lastname={lastName} />
              <Transactions />
          </main>
      </React.Fragment>
  );
}

export default User;