import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkingUserExist, createUserDocument } from "./features/authSlicer";
import "./App.css";
import Login from "./components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import Sidebar from "./components/Sidebar";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  const authslicer = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const page = useWindowSize();

  useEffect(() => {
    dispatch(checkingUserExist(user));
  }, [user]);

  useEffect(() => {
    if (authslicer.user) {
      dispatch(createUserDocument());
    }
  }, [authslicer.user]);

  if (authslicer.authIsReady) {

    if (!authslicer.user) {
      return <Login />;
    }

    return(
      <div className="app" style={{...page}}>
        <div className="app__body">
          <Sidebar/>
        </div>
      </div>

    )




  }



}

export default App;
