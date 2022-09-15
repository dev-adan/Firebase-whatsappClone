
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth,GoogleAuthProvider } from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA7ffpfVmzxGE6NI7dU4SNdzx6BVPNpFz0",
  authDomain: "whatsapp-clone-2f2a6.firebaseapp.com",
  projectId: "whatsapp-clone-2f2a6",
  storageBucket: "whatsapp-clone-2f2a6.appspot.com",
  messagingSenderId: "379863768353",
  appId: "1:379863768353:web:c96ee91f2bfe07cd69f260"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();



export {auth,db,storage,provider}