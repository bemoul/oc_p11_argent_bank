import logoAgency from "../../assets/img/argentBankLogo.png";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { storeSelector } from "../../store/storeSelectors";
import { clearStore, userProfile } from "../../store/storeActions";
import { useEffect } from "react";
import Profil from "../Profil/Profil";

export const Header = () => {

  const store = useSelector(storeSelector);
  const dispatch = useDispatch();

  const handleDisconnection = () => {
      dispatch(clearStore());
  }

  useEffect(() => {
      if (store.authToken) {
          dispatch(userProfile(store.authToken));
      }
  }, [])

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logoAgency} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="main-nav-links">
        {
          store.authToken ?
            <>
              <NavLink to="/user" className="main-nav-item">
                <Profil name={`${store.userFirstName} `} />
              </NavLink>
              <NavLink to="/" className="main-nav-item" onClick={() => handleDisconnection()}>
                <i className="fa fa-sign-out"></i>
                Sign Out
              </NavLink>
            </> :
            <NavLink to="/signin" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
        }
      </div>
    </nav>
  )
}