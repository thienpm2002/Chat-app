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
    //  Khi reload, nếu có token thì dispatch authSuccess
    const token = localStorage.getItem("accessToken");
    const profile = localStorage.getItem("profile");
    const chats = localStorage.getItem("chats");

    if (token && profile && chats) {
      try {
         dispatch(
          authActions.authSuccess({
            profile: JSON.parse(profile),
            chats: JSON.parse(chats)
          })
        );
      } catch (err) {
        console.error("Parse error:", err);
      }
    }
  }, [dispatch]);

  return <RouterProvider router={routes}/>
}

export default App
