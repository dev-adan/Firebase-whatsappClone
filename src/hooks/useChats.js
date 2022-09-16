import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import { collectionGroup, orderBy,query,addDoc, getDoc , getDocs,collection,setDoc,doc} from "firebase/firestore";

const useChats  = async (user) => {
let chats;
   
    if(user){
        const ref = collection(db,'users',user.uid).collection('chats',orderBy('timeStamp','desc'));
        const [snapshot] = useCollection(ref);

        
         chats = snapshot?.docs.map(doc => ({
            id : doc.id,
            ...doc.data()
        }))

    }else{
        return;
    }



return chats ={title : 'adan-test', id :12, name : 'adan-test'}; 

};


// const useChats = async () => {
//     console.log('use chats running')
//     const ref = collection(db,'users1');

    // await addDoc(collection(ref,'ui129121282','chats'), {
    //     comments : []
    // })

    // await addDoc(collection(ref,'ui129121282','groups'), {
    //     groups : []
    // })

    // await addDoc(collection(ref,'uid0992','Groups'),{
    //     name : 'workspace'
    // })
    // await addDoc(collection(ref,'uid0992','Chats'),{
    //     name : 'danial'
    // })
    // await addDoc(collection(ref,'uid0992','Rooms'),{
    //     room : 'dark room'
    // })


    // await setDoc(doc(ref,'uid0992','Groups','APBiqveG0FXi8zaqvbGX','subgroup','KGrxCDBnydDdKsc5TLNN'),{
    //    widgets : [],
    // }, { merge: true })

    //     await addDoc(doc(ref,'uid0992','Groups','APBiqveG0FXi8zaqvbGX','subgroup','KGrxCDBnydDdKsc5TLNN'),{
    //    widgetsDoc : [],
    // }, { merge: true })
   




// };

export default useChats;