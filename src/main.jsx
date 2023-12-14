import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Loging from './pages/Loging/Loging.jsx';
import Registration from './pages/Registration/Registration.jsx';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword.jsx';
import firebaseConfig from './authentication/firebaeConfig.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration/> ,
  },
  {
    path: "/login",
    element: <Loging/> ,
  },
  {
    path: "/home",
    element: <Home/> ,
  },
  {
    path: "/forgotpassword",
    element: <ForgetPassword/> ,
  },
  
   
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
     
  </React.StrictMode>,
)
