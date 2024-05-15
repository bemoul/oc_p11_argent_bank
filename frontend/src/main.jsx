import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// Style import
import "./assets/style/main.scss";

// Pages import
import {App} from './App.jsx'
import { Home } from './pages/Home/Home.jsx';
import { SignIn } from './pages/SignIn/SignIn.jsx';
// Store, Provider : Redux
import store from "./store/store.js";
import { Provider } from 'react-redux';
import User from './pages/User/User.jsx';
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
        path: "/signin",
        element: <SignIn />
      },
      {
      //protected routes
        path: "/user",
        element:
          <User />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
     </Provider> 
  </React.StrictMode>
);