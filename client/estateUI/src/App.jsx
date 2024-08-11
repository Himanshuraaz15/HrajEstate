import { useState } from 'react'
//import './App.css'
import Homepage from './routes/Homepage.jsx';
//import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from './routes/listPage/listPage.jsx';
import { Layout, RequireAuth } from './routes/layout/Layout.jsx';
import Singlepage from './routes/singlepage/Singlepage.jsx';
import Login from './routes/login/Login.jsx';
import ProfilePage from './routes/profilePage/profilePage.jsx';
import Register from './routes/register/register.jsx';
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import ForgotPass from './routes/forgotPass/forgotPass.jsx';
import Contact from './routes/contact/contact.jsx';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
        <Layout/>,
        children :[
          {
          path:"/",
          element:<Homepage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader:listPageLoader
        },
        {
          path:"/:id",
          element:<Singlepage/>,
          loader:singlePageLoader
        },

        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path: "/forgot-password",
          element:<ForgotPass/>
        },
        {
          path:"/contact",
          element:<Contact/>
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return (
    <>

      <RouterProvider router={router}/>
    </>
  )
}

export default App
