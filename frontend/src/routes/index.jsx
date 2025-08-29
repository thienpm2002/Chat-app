import { createBrowserRouter, redirect } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";

import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage.jsx";


import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage.jsx";

const routes = createBrowserRouter([
    {
       path: '/',
       element: <AuthLayout />,
       errorElement: <ErrorPage />,
       children: [
           {
            path:'login',
            element: <LoginPage />,
           },
           {
            path:'home',
            element: <HomePage />,
            loader: async () => {
                const accessToken = localStorage.getItem('accessToken');
                if(!accessToken){
                    return redirect('/login');
                }
                return null;
            }
           },
           {
            path:'profile',
            element: <ProfilePage />,
            loader: async () => {
                const accessToken = localStorage.getItem('accessToken');
                if(!accessToken){
                    return redirect('/login');
                }
                return null;
            }
           },
       ]
    },
])

export default routes;