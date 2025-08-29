import { RouterProvider } from "react-router-dom";
import './styles/base.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions as authActions } from "./store/slices/authSlice";

import routes from './routes/index.jsx'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 🔥 Khi reload, nếu có token thì dispatch authSuccess
    const token = localStorage.getItem("accessToken");
    const profile = localStorage.getItem("profile");

    if (token && profile) {
      try {
        dispatch(authActions.authSuccess(JSON.parse(profile)));
      } catch (err) {
        console.error("Parse profile error:", err);
      }
    }
  }, [dispatch]);
  return <RouterProvider router={routes}/>
}

export default App
