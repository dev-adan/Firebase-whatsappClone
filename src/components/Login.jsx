import React from "react";
import "./Login.css";
import Button from '@mui/material/Button';
import { auth,provider  } from "../firebase/config";
import { signInWithRedirect} from "firebase/auth";



const Login = () => {

  const login = () => {

    signInWithRedirect(auth,provider)

  }

  return (
    <div className="app">
      <div className="login">
        <div className="login__container">
          <img src='/login-logo.png' alt='Logo'/>
            <div className="login__text">
              <h1>Sign in to Whatsapp</h1>
            </div>
            <Button onClick={login}>Sign in with Google</Button>

        </div>
      </div>
    </div>
  );
};

export default Login;
