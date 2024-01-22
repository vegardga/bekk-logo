import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Logo from './Logo.jsx'
import Frame from './Frame.jsx'
import NotFound from './NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Logo/>,
    errorElement: <NotFound/>,
  },
  {
    path: "/bekk-logo",
    element: <Logo/>,
    errorElement: <NotFound/>,
  },
  {
    path: "/bekk-logo/frame",
    element: <Frame/>,
    errorElement: <NotFound/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);
