import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client'; // Are you sure about this import? It's unusual.

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import "./assets/style/main.scss";

import { App } from './App.jsx';
import { Home } from './pages/Home/Home.jsx';
import { SignIn } from './pages/SignIn/SignIn.jsx';
import reducer from "./reducers";
import { getUserProfile } from './reducers/auth';
import Profile from './pages/Profile/Profile.jsx';

// Create browser router instance with route configuration
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
        element: <SignIn />
      },
      {
        // protected routes
        path: "/profile",
        element: <Profile />
      },
     {
      path: "*",
      element: <Navigate to="/" />
     }
    ],
  },
]);

// Configure Redux store with combined reducers
const store = configureStore({ reducer });

// AppInitializer handles any necessary app initialization logic
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
