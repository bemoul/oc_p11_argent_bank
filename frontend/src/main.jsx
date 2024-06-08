import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import "./assets/style/main.scss";

import { App } from './App.jsx';
import { Home } from './pages/Home/Home.jsx';
import { SignIn } from './pages/SignIn/SignIn.jsx';
import reducer from "./reducers";
import { getUserProfile } from './reducers/auth';
import Profile from './pages/Profile/Profile.jsx';
import GuestRoute from './components/GuestRoute/GuestRoute.jsx';

/**
 * main.jsx - Entry point for the application
 * 
 * This file sets up the React application, configures the Redux store,
 * defines route protection, and initializes the app.
 */

/**
 * Configures the Redux store with combined reducers
 */
const store = configureStore({ reducer });

/**
 * PrivateRoute component to protect routes
 *
 * @param {Object} props - The component props
 * @param {JSX.Element} props.children - The children components
 * @returns {JSX.Element} The protected route or a redirection to login
 */
const PrivateRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return currentUser ? children : <Navigate to="/login" />;
};

/**
 * Create a browser router instance with route configuration
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <SignIn />
          </GuestRoute>
        ),
      },
      {
        // protected routes
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

/**
 * AppInitializer component to handle any necessary app initialization logic
 *
 * @returns {JSX.Element} The initialized app with router
 */
const AppInitializer = () => {
  const dispatch = useDispatch();

  // Fetch user profile if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(getUserProfile(token));
    }
  }, [dispatch]);

  // Render RouterProvider with configured router
  return (
    <RouterProvider router={router} />
  );
};

// Render the root of the app with strict mode enabled
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the entire app with Redux Provider to provide the store */}
    <Provider store={store}>
      <AppInitializer /> {/* Initialize the app */}
    </Provider>
  </React.StrictMode>
);
