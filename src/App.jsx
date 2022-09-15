import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkingUserExist, createUserDocument } from "./features/authSlicer";
import "./App.css";
import Login from "./components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import Sidebar from "./components/Sidebar";
import useWindowSize from "./hooks/useWindowSize";
import { Routes, Route,useNavigate,Navigate} from "react-router-dom";
import Chat from "./components/Chat";


function App() {
  const authslicer = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const page = useWindowSize();
  const navigate = useNavigate();
 

  useEffect(() => {
    if (user) {
      dispatch(checkingUserExist(user));
    }
  }, [user]);

  useEffect(() => {
    if (authslicer.user) {
      dispatch(createUserDocument());
    }
  }, [authslicer.user]);


  useEffect(() => {
       {page.isMobile ? navigate('/chats') : navigate('/')} 
  },[page])

  if (authslicer.authIsReady) {
    if (!user) {
      return <Login />;
    }
    return (
      <div className="app" style={{ ...page }}>
  
        <div className="app__body">
          <Sidebar user={authslicer.user} page={page} />

          <Routes>
            <Route path='/room/:roomId' element={<Chat user={authslicer.user} page={page}/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
