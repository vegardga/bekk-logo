import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Logo from './Logo.jsx'
import NotFound from './NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Logo/>,
    errorElement: <NotFound/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);
