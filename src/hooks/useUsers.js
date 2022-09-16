import { collection, orderBy,query } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase/config";

const useUsers = (user) => {

    const ref = query(collection(db,'users'),orderBy('timeStamp','desc'));
   const [snapshot] =  useCollection(ref);

   const users = [];
   if(user){
   
    snapshot?.docs.forEach(doc => {
        const id = doc.id > user.uid ? `${doc.id}${user.uid}` : `${user.uid}${doc.id}`
        if(doc.id !== user.uid){
                users.push({
                    id,
                    userID : doc.id,
                    ...doc.data()
                })
        }
    })

   }



   return users;

}

export default useUsers;