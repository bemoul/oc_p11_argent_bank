import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { storeSelector } from '../../store/storeSelectors';
import { userLogin } from '../../store/storeActions';

export const UserForm = () => {
  const navigate = useNavigate();
  const user = useSelector(storeSelector);
  const dispatch = useDispatch();

  const [error, setError] = useState({ email: "", password: "" });

  const formValidation = (email, password) => {
    let isValid = true;

    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))) {
      setError((prevErrors) => ({ ...prevErrors, email: "email required" }));
      isValid = false;
    }

    if (!password) {
      setError((prevErrors) => ({ ...prevErrors, password: "Password required" }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError({ email: "", password: "" });

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    const isValid = formValidation(email, password);

    if (isValid) {
      dispatch(userLogin({ email, password, rememberMe }));
    }
  };

  useEffect(() => {
    if (user.isLogged) {
      navigate("/user");
    }
  }, [user.isLogged, user.authToken]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Connexion</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              label="username"
              autoComplete="off"
              error={error.email}
              required
            />
            {error.email && <p className="error-message">{error.email}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              label="password"
              error={error.password}
              required
            />
            {error.password && <p className="error-message">{error.password}</p>}
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" label="remember me" />
            <label htmlFor="remember-me">Se souvenir de moi</label>
          </div>

          <button className="sign-in-button" onClick={(e) => handleSubmit(e)}>
            Connexion
          </button>
        </form>
      </section>
    </main>
  );
};
