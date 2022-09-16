import React from 'react';
import { collection,query,orderBy, addDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/config';

const useRooms = () =>  {

    const ref = query(collection(db,'rooms'),orderBy('timestamp','desc'))

    const [snapshot] =  useCollection(ref)

    const rooms = snapshot?.docs.map(doc => (
       { 
        id : doc.id,
        userID : doc.id,
        ...doc.data()
       }
    ))

   
 
       return rooms;
}






export default useRooms;