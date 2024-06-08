import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/auth";
import { useState } from "react";

/**
 * UserForm component for user login
 *
 * @returns {JSX.Element} UserForm component
 */
export const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error } = useSelector((state) => state.auth);

  /**
   * Handles form submission
   *
   * @param {Event} e - The form submit event
   */
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        const token = action.payload.body.token;
        console.log('Token:', token); // Log the token
        if (token) {
          localStorage.setItem("accessToken", token);
          navigate("/profile");
        } else {
          console.error("Token is undefined");
        }
      }
    });
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Connexion</h1>
        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Se souvenir de moi</label>
          </div>

          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Connexion"}
          </button>
        </form>
      </section>
    </main>
  );
};
