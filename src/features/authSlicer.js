import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { collection, doc,serverTimestamp ,setDoc,getDoc  } from 'firebase/firestore';
import { auth,db } from '../firebase/config';



const initialState = {
    user : null,
    authIsReady : false,
}


export const createUserDocument = createAsyncThunk('auth/createUserDocument' , async (_,{getState}) => {
    const state = getState();

    const ref = doc(db,'users',state.auth.user.uid);
    const userDoc =  await  getDoc(ref);

     if(!userDoc.exists()){
         setDoc(ref,{
            name : state.auth.user.displayName,
            photoURL : state.auth.user.photoURL,
            timeStamp : serverTimestamp (),
        })
     }
})



export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {


        checkingUserExist : (state,action) => {
            state.authIsReady = true;
            state.user = action.payload;
        
        }

    },


    extraReducers : {
        [createUserDocument.pending] : (state) => {
           

        },
        [createUserDocument.fulfilled] : (state) => {
            console.log('fulfilled');
            

            
        },
        [createUserDocument.rejected] : () => {
          
        },
    }
})

export const {checkingUserExist} = authSlice.actions;

export default authSlice.reducer;